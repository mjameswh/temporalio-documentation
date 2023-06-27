---
id: how-to-handle-an-update-in-go
title: How to handle an Update in Go
sidebar_label: Handle Update
description: Use the SetUpateHandler API from the go.temporal.io/sdk/workflow package to register an Update Handler for a given name.
---

Register an Update handler for a given name using the [SetUpdateHandler](https://pkg.go.dev/go.temporal.io/sdk/workflow#SetUpdateHandler) API from the `go.temporal.io/sdk/workflow` package.
The handler function can accept multiple serializable input parameters, but we recommend using only a single parameter.
This practice enables you to add fields in future versions while maintaining backward compatibility.
You can optionally include a `workflow.Context` parameter in the first position of the function.
The function can return either a serializable value with an error or just an error.
The Workflow's WorkflowPanicPolicy configuration determines how panics are handled inside the Handler function.
WorkflowPanicPolicy is set in the Worker Options.

Update handlers, unlike Query handlers, can change Workflow state.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/main/yourupdate/your_updatable_workflow_dacx.go">View source code</a>

```go
// ...
func YourUpdatableWorkflow(ctx workflow.Context, param WFParam) (WFResult, error) {
	counter := param.StartCount
	err := workflow.SetUpdateHandler(ctx, YourUpdateName, func(ctx workflow.Context, arg YourUpdateArg) (YourUpdateResult, error) {
		counter += arg.Add
		result := YourUpdateResult{
			Total: counter,
		}
		return result, nil
	})
// ...
}
```