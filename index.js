// All this does is check dependencies and install them if they are not
// installed - the server code is in server.js

const { exec } = require("child_process");

console.log(`
┌──────────────────────────────────────┐
│                                      │
│  EasyWikiDev                         │
│  A quick tool by User:Ed6767         │
│                                      │
└──────────────────────────────────────┘
`);

// This code is from Teyora, but was before the code was transitioned to
// GPLv3 from Apache 2.0, so is Apache 2.0 Licensed.
// Code is (c) 2020 Chlod Aidan Alejandro (chlod.net)
const runProcess = async (command, options, runOptions = {
    silent: false
}) => {
    if (!runOptions.silent) console.log("-".repeat(60));
    const proc = exec(command, {
        cwd: __dirname,
        windowsHide: true,
        ...options
    });

    let stdout = Buffer.alloc(0);
    let stderr = Buffer.alloc(0);

    // noinspection JSUnresolvedFunction
    proc.stdout.on("data", function (d) {
        const data = typeof d === "string" ? Buffer.from(d) : d;

        if (!runOptions.silent)
            // noinspection JSUnresolvedFunction
            process.stdout.write(d);

        stdout = Buffer.concat([stdout, data]);
    });

    // noinspection JSUnresolvedFunction
    proc.stderr.on("data", function (d) {
        const data = typeof d === "string" ? Buffer.from(d) : d;

        if (!runOptions.silent)
            // noinspection JSUnresolvedFunction
            process.stderr.write(d);

        stderr = Buffer.concat([stderr, data]);
    });

    const code = await new Promise((res, rej) => {
        proc.on("exit", function (code) {
            if (code === 0) res(code);
            else rej(code);
        });
    }).catch(r => r);

    if (!runOptions.silent) console.log("-".repeat(60));
    return {
        code: code,
        stdout: stdout,
        stderr: stderr
    };
};

// Now we run

(async() => {
    try {
        console.log("Checking dependencies...");
        await runProcess("npm i --no-progress");
    
        // Run the server
        console.log("Running server...");
        await require("./server.js")();
    } catch (error) {
        console.error(error);
        console.log("Something went wrong. Please try again, then report the issue.");
    }
})();