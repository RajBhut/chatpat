# Log (module)

## Basic usage

```ts
import { logger, LogType } from "...";

logger()
    .type(LogType.SUCCESS)
    .message("Server started")
    .commit()
```

## With Prefix

```ts
import { logger, LogType } from "...";

logger()
    .type(LogType.OK)
    .prefix("request")
    .prefix("GET")
    .message("/auth/login")
    .commit()
```

## With Listeners

```ts
import { logger, LogType } from "...";

logger()
    .type(LogType.WARN)
    .on("commit", ({ log, info })=>{
        console.log(`The following log was committed with ${info.type} type: `, log);
    })
    .message("I was committed")
    .commit()
```