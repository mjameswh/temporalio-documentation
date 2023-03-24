---
id: cmd-options
title: Temporal CLI command options reference
sidebar_label: cmd options
description: How to use the Temporal CLI command options
toc_max_heading_level: 4
---

<!-- THIS FILE IS GENERATED. DO NOT EDIT THIS FILE DIRECTLY -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## active-cluster

Active cluster name

## activity-id

Identifies the Activity Execution.

## address

The host and port (formatted as host:port) for the Temporal Frontend Service.

## archived

List archived Workflow Executions. Currently an experimental feature.

## calendar

Calendar specification in JSON ({"dayOfWeek":"Fri","hour":"17","minute":"5"}) or as a Cron string ("30 2 * * 5" or "@daily").

## catchup-window

Maximum allowed catch-up time if server is down.

## cluster

Cluster name

## codec-auth

Sets the authorization header on requests to the Codec Server.

## codec-endpoint

Endpoint for a remote Codec Server.

## color

when to use color: auto, always, never. (default: auto)

## concurrency

Request concurrency. (default: 10)

## config

Alias: **-c**
Path to config directory.

## context-timeout

An optional timeout for the context of an RPC call (in seconds). (default: 5)

## cron

Optional Cron Schedule for the Workflow. Cron spec is formatted as:
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
│ │ │ │ │

---

## data

Namespace data in a format key=value

## db-filename

Alias: **-f**
File in which to persist Temporal state (by default, Workflows are lost when the process dies).

## depth

Number of Child Workflows to expand, -1 to expand all Child Workflows. (default: -1)

## description

Namespace description

## detail

Detail to fail the Activity.

## dry-run

Simulate reset without resetting any Workflow Executions.

## dynamic-config-value

Dynamic config value, as KEY=JSON_VALUE (string values need quotes).

## email

Owner email

## enable-connection

Enable cross-cluster connection.

## end-time

Backfill end time.

## env

Name of the environment to read environmental variables from. (default: default)

## event-id

The Event Id for any Event after WorkflowTaskStarted you want to reset to (exclusive). It can be WorkflowTaskCompleted, WorkflowTaskFailed or others.

## exclude-file

Input file that specifies Workflow Executions to exclude from resetting.

## execution-timeout

Timeout (in seconds) for a WorkflowExecution, including retries and continue-as-new tasks. (default: 0)

## fields

Customize fields to print. Set to 'long' to automatically print more of main fields.

## fold

Statuses for which Child Workflows will be folded in (this will reduce the number of information fetched and displayed). Case-insensitive and ignored if --no-fold supplied. (default: completed,canceled,terminated)

## follow

Alias: **-f**: Follow the progress of a Workflow Execution.
Follow the progress of a Workflow Execution.

## frontend-address

Frontend address of the remote Cluster.

## global

Flag to indicate whether namespace is a global namespace

## grpc-meta

Contains gRPC metadata to send with requests (format: key=value). Values must be in a valid JSON format.

## headless

Disable the Web UI.

## history-archival-state

Flag to set history archival state, valid values are "disabled" and "enabled"

## history-uri

Optionally specify history archival URI (cannot be changed after first time archival is enabled)

## identity

Specify operator's identity.

## id-reuse-policy

Allows the same Workflow Id to be used in a new Workflow Execution (AllowDuplicate, AllowDuplicateFailedOnly, RejectDuplicate, TerminateIfRunning).

## input-file

Passes optional input for the Workflow from a JSON file. If there are multiple JSON files, concatenate them and separate by space or newline. Input from the command line will overwrite file input.

## input-parallelism

Number of goroutines to run in parallel. Each goroutine processes one line for every second. (default: 1)

## input-separator

Separator for the input file. The default is a tab (	). (default: 	)

## input

Alias: **-i**
Optional JSON input to provide to the Workflow. Pass "null" for null values.

## interval

Interval duration, e.g. 90m, or 90m/13m to include phase offset.

## ip

IPv4 address to bind the frontend service to. (default: 127.0.0.1)

## jitter

Jitter duration.

## job-id

Batch Job Id

## limit

Number of items to print. (default: 0)

## log-format

Set the log formatting. Options: ["json", "pretty"]. (default: json)

## log-level

Set the log level. Options: ["debug" "info" "warn" "error" "fatal"]. (default: info)

## max-field-length

Maximum length for each attribute field. (default: 0)

## memo

Set a memo on a schedule (format: key=value). Use valid JSON formats for value.

## memo-file

Set a memo from a file. Each line should follow the format key=value. Use valid JSON formats for value.

## metrics-port

Port for /metrics (default: 0)

## name

Frontend address of the remote Cluster.

## namespace

Alias: **-n**
Identifies a Namespace in the Temporal Workflow. (default: default)

## namespace-id

Namespace Id

## no-fold

Disable folding. All Child Workflows within the set depth will be fetched and displayed.

## no-pager

Alias: **-P**: Disables the interactive pager.
Disables the interactive pager.

## non-deterministic

Reset Workflow Execution only if its last Event is WorkflowTaskFailed with a nondeterministic error.

## notes

Initial value of notes field.

## output-filename

Serializes Event History to a file.

## output

Alias: **-o**
format output as: table, json, card. (default: table)

## overlap-policy

Overlap policy (options: Skip, BufferOne, BufferAll, CancelOther, TerminateOther, AllowAll).

## pager

Sets the pager for Temporal CLI to use (options: less, more, favoritePager).

## pause-on-failure

Pause schedule after any workflow failure.

## pause

Pauses the Schedule.

## port

Alias: **-p**
Port for the frontend gRPC service. (default: 7233)

## promote-global

Promote local namespace to global namespace

## query

Alias: **-q**
Visibility Query of Search Attributes describing the Workflow Executions to reset. See https://docs.temporal.io/docs/tctl/workflow/list#--query.

## raw

Print raw data as json (prefer this over -o json for scripting).

## reapply-type

Event types to reapply after the reset point: , Signal, None. (default: All)

## reason

Reason for the operation

## reject-condition

Optional flag for rejecting Queries based on Workflow state. Valid values are "not_open" and "not_completed_cleanly".

## remaining-actions

Total number of actions allowed. (default: 0)

## reset-points

Only show Workflow Events that are eligible for reset.

## result

Set the result value of Activity completion.

## retention

Workflow Execution retention

## run-id

Alias: **-r**
Identifies the current Workflow Run.

## run-timeout

Timeout (in seconds) of a single Workflow run. (default: 0)

## schedule-id

Alias: **-s**
Schedule Id

## search-attribute

Set Search Attribute on a schedule (format: key=value). Use valid JSON formats for value.

## skip-base-is-not-current

Skip a Workflow Execution if the base Run is not the current Run.

## skip-current-open

Skip a Workflow Execution if the current Run is open for the same Workflow Id as the base Run.

## sqlite-pragma

Specify sqlite pragma statements in pragma=value format. Pragma options: ["journal_mode" "synchronous"].

## start-time

Backfill start time.

## task-queue-type

Task Queue type [workflow|activity] (default: workflow)

## task-queue

Alias: **-t**
Task Queue

## task-timeout

Start-to-close timeout for a Workflow Task (in seconds). (default: 10)

## time-format

Format time as: relative, iso, raw. (default: relative)

## time-zone

Time zone (IANA name).

## tls-ca-path

Path to server CA certificate.

## tls-cert-path

Path to x509 certificate.

## tls-disable-host-verification

Disables TLS host name verification if already enabled.

## tls-key-path

Path to private certificate key.

## tls-server-name

Provides an override for the target TLS server name.

## type

Search attribute type: [Text Keyword Int Double Bool Datetime KeywordList]

## ui-asset-path

UI Custom Assets path.

## ui-codec-endpoint

UI Remote data converter HTTP endpoint.

## ui-ip

IPv4 address to bind the Web UI to.

## ui-port

Port for the Web UI. (default: 0)

## unpause

Unpauses the Schedule.

## visibility-archival-state

Flag to set visibility archival state, valid values are "disabled" and "enabled"

## visibility-uri

Optionally specify visibility archival URI (cannot be changed after first time archival is enabled)

## workflow-id

Alias: **-w**
Workflow Id

## workflow-type

Workflow type name.

## yes

Alias: **-y**: Confirm all prompts.
Confirm all prompts.
