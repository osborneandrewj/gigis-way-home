# GiGi's Way Home

A subtraction game for Carlie (Singapore Math, 1st grade, up to 40). One self-contained `index.html`, plus a manifest and service worker so it can live on the iPad home screen and keep working in airplane mode.

## Put it on the web (GitHub Pages)

1. Merge this branch into `main`.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Branch: **main**. Folder: **/ (root)**. Save.
5. Wait for the Pages site to finish, then open the URL GitHub shows (for this repo it will look like `https://osborneandrewj.github.io/gigis-way-home/`).

The game does not load anything from the network while she is playing. The home-screen copy asks the network first for a new version, waits a couple of seconds, and opens the saved copy if the iPad is offline. Icons stay saved on the iPad.

## Add it to the iPad home screen

1. Open the Pages URL in **Safari** (the blue compass). Use landscape.
2. Tap the **Share** button.
3. Tap **Add to Home Screen**, then **Add**.
4. Open GiGi from the new icon. The first time, stay online so the game can save itself for later.
5. After that, it opens full screen and still plays with the iPad in airplane mode.

Turn the iPad sideways. Tap anywhere on the title screen (it says hi to Carlie) before the talking and the sounds start.

## For a parent

Long-press the blue bar at the top for about two seconds, or tap the top-left corner five times. From there you can slow down or speed up the timer, mute speech and sounds, jump to a level she has unlocked, or reset patches and stars. ALL LEVELS opens every level, including ones she has not reached. Timer and mute stay put when you reset progress.

A level is cleared when **8 of the last 10** problems are right on the **first try**, before GiGi falls asleep. A miss shows a hint and does not cost a life. Level 1 has no timer and clears on that 8-of-10 window. Each later level, including the sock, starts with an untimed warm-up pass. When 8 of the last 10 are right, that pass ends, her last-10 window resets, and the same kind of problems come back on a timer (about 20 seconds, shrinking toward 8, a little longer after a timeout). The patch is sewn only on the timed pass.
