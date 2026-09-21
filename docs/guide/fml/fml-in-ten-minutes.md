---
sidebar_position: 1
title: FML in ten minutes
description: A complete FML model of thirty lines, read line by line, then run and checked.
---

# FML in ten minutes

This page reads one complete model, line by line, then runs it. The model is a to-do list: a list
holds tasks, a task has a label and can be completed, and the list can tell which tasks are still
open. It uses no external resource.

## The model

```
import java.util.List;

@URI("http://openflexo.org/test/TestResourceCenter/TaskList.fml")
public model TaskList {

	Task[0,*] tasks;
	int taskCount values tasks.size;

	public Task addTask(String label) {
		Task task = new Task(parameters.label);
		tasks.add(task);
		return task;
	}

	public List<Task> openTasks() {
		return select Task from (this) where (selected.done == false);
	}

	public concept Task {

		String label;
		boolean done;
		String status values done ? "done" : "open";

		create(String label) {
			label = parameters.label;
			done = false;
		}

		public complete() {
			done = true;
		}
	}
}
```

## Reading it

**The virtual model.** `model TaskList { … }` declares a virtual model, the unit that holds
concepts. `@URI(…)` gives it its address, the one other models use to refer to it.
`import java.util.List;` imports the Java type `List`, used by the return type of `openTasks()`.

**A property that holds other objects.** `Task[0,*] tasks;` declares a property named `tasks`,
whose values are instances of the concept `Task`, from zero to any number (`[0,*]` is the
cardinality). The properties of a concept are the data of its instances.

**A computed property.** `int taskCount values tasks.size;` is read-only: its value is the
result of the expression after `values`, and follows the properties that expression reads. `tasks.size` is a path, made of
a property followed by what that property offers.

**A behaviour.** `public Task addTask(String label) { … }` is a behaviour of the model, the
counterpart of a method. Its body is a sequence of instructions:

- `new Task(parameters.label)` creates an instance of the concept `Task`. The instance is created
  *inside* the instance of the model on which the behaviour runs.
- `tasks.add(task);` adds it to the property.
- `return task;` returns it.

A behaviour reads its arguments through `parameters`: write `parameters.label`, not `label`. A bare `label`
does not designate the argument.

**A query.** `select Task from (this) where (selected.done == false)` looks for the instances of
`Task` contained in the current instance and keeps those for which the condition holds; `selected`
designates the instance being examined. The result is a `List<Task>`, the return type of the
behaviour.

**A concept.** `public concept Task { … }` declares a concept nested in the model. Its properties
are `label`, `done` and `status`, the last one computed with a conditional expression:
`done ? "done" : "open"`.

**A creation scheme.** `create(String label) { … }` is what runs when an instance of the concept is
created with `new Task(…)`: it plays the part of a constructor. It reads its argument through
`parameters.label` and assigns it to the property `label`.

**A behaviour of the concept.** `complete()` has no return type: it only changes state.

## Running it

An FML-script loads the model, creates an instance, calls the behaviours and checks the values they
give. The model above and this script (an excerpt of it) are part of the automated tests of the
`openflexo-core` repository, which run every `assert`.

```
virtualModel = load -r ["http://openflexo.org/test/TestResourceCenter/TaskList.fml"];
service ResourceCenterService add_temp_rc;
list = new TaskList() with (name="groceries");
assert list.taskCount == 0;

milk = list.addTask("Buy milk");
bread = list.addTask("Buy bread");
assert milk.status == "open";
assert milk.container == list;
assert list.taskCount == 2;
assert list.openTasks().size == 2;

milk.complete();
assert milk.status == "done";
assert list.openTasks().size == 1;
assert list.openTasks().get(0) == bread;
```

`load` reads the model from its address, `new TaskList() with (name="groceries")` creates an
instance of it, and every `assert` states a value that must hold, or the run fails.

## What you have seen

A model is made of **concepts**, which have **properties** (data, possibly computed) and
**behaviours** (instructions, possibly querying), and are instantiated by the runtime.
