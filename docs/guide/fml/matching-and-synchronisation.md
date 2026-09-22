---
sidebar_position: 8
title: Matching and synchronisation
description: How match keeps a set of instances in step with a source, run after run, and the limits of the current implementation.
---

# Matching and synchronisation

A federation often has to keep a set of instances in step with something else: one badge for each
member of a team, one concept instance for each row of a spreadsheet, one graphical element for each
class of a diagram. Written with `select` and `new`, such a behaviour would create the same
instances again at every run. **Matching** is the instruction that makes it repeatable: it reuses
the instance that already corresponds to a source, creates the ones that are missing, and removes the
ones whose source is gone.

![Matching: synchronizing without duplicates](/img/architecture/10-matching.png)

The examples use a model `Team` with members, and a badge that must exist for each member.

## The three instructions

A synchronisation is made of three instructions around a **matching set**:

1. `begin match Badge from this` opens the set, filled with the badges that exist already.
2. `match Badge in badges from this where (member = m) unmatched: new Badge(m)` looks in the set
   for the badge of `m`. If there is one, it is used and taken out of the pool of the unmatched.
   If not, the `unmatched:` part creates it. The instruction gives the badge, found or created.
3. `end match Badge in badges unmatched: delete()` handles what is left in the pool, the badges that
   no source claimed, and deletes them.

```
public int syncBadges() {
	MatchingSet<Badge> badges = begin match Badge from this;
	for (Member m : select Member from this) {
		Badge b = match Badge in badges from this where (member = m) unmatched: new Badge(m);
		b.text = m.name;
	}
	end match Badge in badges unmatched: delete();
	List<Badge> all = select Badge from this;
	return all.size;
}
```

The concepts are:

```
public concept Member {

	String name;

	create(String name) {
		name = parameters.name;
	}

	delete() {
	}
}

public concept Badge {

	Member member;
	String text;

	create(Member member) {
		member = parameters.member;
	}

	delete() {
	}
}
```

The `where` of a `match` is written differently from the `where` of a `select`. It states the
properties of the instance to find, `member = m`: the left side is a property of the concept
matched, the right side a value. There is no `selected`.

## What a run does

Two members, and a first run:

```
team = new Team() with (name="team");
ann = team.newMember("Ann");
bob = team.newMember("Bob");

assert team.syncBadges() == 2;
badgeAnn = team.badgeOf(ann);
assert badgeAnn != null;
assert badgeAnn.text == "Ann";
```

Running it again creates nothing, and the badge found is the very same instance:

```
assert team.syncBadges() == 2;
assert team.badgeOf(ann) == badgeAnn;
```

Because the instruction gives the matched instance, the behaviour can bring it up to date: a change
in the source reaches the badge, which is not replaced.

```
ann.name = "Anna";
assert team.syncBadges() == 2;
assert team.badgeOf(ann) == badgeAnn;
assert badgeAnn.text == "Anna";
```

A source that disappears takes its badge with it, and a new source gets one:

```
team.removeMember(bob);
assert team.syncBadges() == 1;

carl = team.newMember("Carl");
assert team.syncBadges() == 2;
```

## Several concepts in one behaviour

Give each concept **its own matching set**, opened at the start and closed at the end:

```
public int syncBoth() {
	MatchingSet<Badge> badges = begin match Badge from this;
	MatchingSet<SquadTag> tags = begin match SquadTag from this;
	for (Member m : select Member from this) {
		match Badge in badges from this where (member = m) unmatched: new Badge(m);
	}
	for (Squad s : select Squad from this) {
		match SquadTag in tags from this where (squad = s) unmatched: new SquadTag(s);
	}
	end match Badge in badges unmatched: delete();
	end match SquadTag in tags unmatched: delete();
	List<Badge> allBadges = select Badge from this;
	List<SquadTag> allTags = select SquadTag from this;
	return allBadges.size * 10 + allTags.size;
}
```

With two members and one squad, the result is stable from one run to the next:

```
squad = team.newSquad("red");
assert team.syncBoth() == 21;
assert team.syncBoth() == 21;
```

## Limits

The matching engine has known defects. Each one below gives a wrong result without any message; the
pattern above avoids all of them.

- **Always open a matching set and close it.** A `match` written without `in <set>` uses an implicit
  set, shared by the whole behaviour and typed by the *first* match executed. A second concept
  matched in the same behaviour is never found again, and a new instance is created at every run.
  With one source instance for each of two concepts, the second run of the behaviour left two
  instances of the second concept. In addition, the implicit set deletes at the end of the
  behaviour whatever it did not match.
- **The `where` of `begin match` is ignored.** `begin match Mark from this where (…)` opens a set
  with every `Mark`, whatever the condition, and an `end match … unmatched: delete()` then deletes
  the ones the condition was meant to leave out: with two marks, one of them satisfying the
  condition, both were deleted and none was left. Filter in the `match` instructions, by choosing
  what you iterate over.
- **Write `unmatched: delete()` and nothing else in an `end match`.** The form
  `unmatched: someBehaviour()` is accepted, but it does not call that behaviour: it runs on each
  leftover instance the first behaviour the concept declares, which may be a deletion behaviour, so
  the instances are deleted.
- **`delete()` runs the first deletion behaviour the concept declares.** Give a concept that is
  closed by an `end match` exactly one deletion behaviour: with several, the first one is the one
  that runs, whatever it does to the federated data.

## What you have seen

`begin match`, `match` and `end match` keep a set of instances in step with a source: they create
what is missing, reuse what exists (the same instance, that the behaviour can update), and delete
what no source claims. Use one explicit matching set for each concept, and `delete()` to close it.

The model and script (`Team.fml` and `TestTeam.fmlscript`) are tests of the platform, in the
`openflexo-core` repository. The limits were measured on the same platform, and are recorded as known
defects there.
