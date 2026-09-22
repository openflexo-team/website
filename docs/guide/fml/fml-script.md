---
sidebar_position: 11
title: FML-script
description: Driving the runtime from a script — loading resources, instantiating models, asserting values — and its traps.
---

# FML-script

**FML-script** (`.fmlscript`) is the other textual surface of the language, alongside FML proper.
Where FML *defines* a model, FML-script *drives* it: it loads resources, creates instances, calls
behaviours and checks values. It shares its expressions, its `new` and its types with FML proper —
everything covered on the previous pages of this section works the same way inside a script — but
its top level is a sequence of commands instead of a `model { … }` declaration.

Every example on this page and elsewhere in this section is itself a `.fmlscript`: the automated
tests of the platform run them and check every `assert`.

## Anatomy of a script

A script is a sequence of `;`-terminated statements, with `//` line comments. A statement is a
command, an FML expression, or an assignment (`name = expr;`):

```
virtualModel = load -r ["http://openflexo.org/test/TestResourceCenter/TaskList.fml"];
assert virtualModel != null;

service ResourceCenterService add_temp_rc;
list = new TaskList() with (name="groceries");
assert list.taskCount == 0;

milk = list.addTask("Buy milk");
assert milk.label == "Buy milk";

log "Test PASSED: the TaskList model of the user guide behaves as documented";
```

`load -r […]` loads a resource by address and gives the loaded object; for an `.fml` resource this
is the virtual model itself. `service ResourceCenterService add_temp_rc;` gives the script a
writable resource center, needed before creating any instance. `new TaskList() with (name=…)`
instantiates the model; `with (name=…)` is mandatory, and omitting it stops the script with
`cannot instantiate … because new VirtualModelInstance name was not set`. `assert` states a value
that must hold: the run fails, with a message naming the line, if it does not.

## Commands

Besides `load` and `service`, a script has a handful of directives for inspecting the runtime:

| Command | Use |
|---|---|
| `resources;` | list the resources currently known |
| `context;` | print the bindings currently in scope |
| `activate <adapter>;` | activate a technology adapter |
| `service <Name> <action> […];` | drive a Flexo service (`add_temp_rc`, `status`…) |
| `log <expr>;` | write a message |
| `assert <expr>;` | check a value |

## Instantiating a model whose only creation scheme is named

`new <Model>(…)` reaches only an **unnamed** creation scheme. A model that declares only a named one
must be instantiated by name:

```
public model Journal {

	String title;

	create::start(String title) {
		title = parameters.title;
	}

	public String label() {
		return title;
	}
}
```

```
diary = new Journal::start("Diary") with (name="diary");
assert diary != null;
assert diary.label() == "Diary";
```

`new Journal() with (name="j1")` on the same model does not resolve, and stops the script.

## Querying from a script

`select` is an instruction of a behaviour body, not a script statement: `select Task from vmi;` on
its own does not parse. To check what a query finds, call a behaviour that returns it, as the
[queries page](/docs/guide/fml/queries-with-select) does:

```
assert list.openTasks().size == 2;
```

## Reserved words of a script

FML-script reserves its command names, on top of the [reserved words of
FML](/docs/guide/fml/declaring-models-and-concepts) itself: `help`, `history`, `execute`, `pwd`,
`ls`, `cd`, `services`, `service`, `activate`, `resources`, `open`, `load`, `more`, `enter`, `exit`,
`quit`, `context`. A creation scheme named `open` fails to parse from a script (`expecting:
lidentifier`), although the very same name parses fine inside FML proper: rename it if a script
must instantiate it by name.

## Known limits

- **A failed `load` or `new` stops the script**, with a message naming the failing command; nothing
  after it runs, unlike inside an FML behaviour where the same mistake often gives a silent `null`
  (see the [expressions page](/docs/guide/fml/expressions)).
- **The whole script is checked before any command runs.** An unresolved binding anywhere, even on
  the last line, aborts the run before the first line executes: none of the `log` lines are
  printed, however early they are. When a script does not print what you expect, look at its last
  lines first.
- **Reassigning a name gives `null` from then on.** `x = "a"; x = "b";` leaves `x` at `null`, not
  `"b"`, for every read after the second assignment — including further reassignments. Give every
  new value its own name instead of reusing one.

## What you have seen

A script loads resources, instantiates models with `new … with (name=…)`, and checks the result
with `assert`. It shares FML's expressions and types, adds its own commands and reserved words, and
fails a mistaken `load` or `new` outright rather than giving a silent `null`. Reassigning a name and
querying without a behaviour are two things to avoid.

The models and scripts on this page (`TaskList.fml`, `Journal.fml`) are tests of the platform, in
the `openflexo-core` repository.
