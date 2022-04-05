# ITL Stream Widget

Display [ITL Online 2022](https://itl2022.groovestats.com) event stats on a livestream for a given entrant via a browser source. 
The source refreshes every minute to keep information up to date.

![image](https://user-images.githubusercontent.com/11725545/161714632-d70da56b-e24b-42f2-a18a-549e07b4c834.png)

## Demo
Live demo: [https://itlwidget.surge.sh/?entrantId=1](https://itlwidget.surge.sh/?entrantId=1)

## Usage

Create a browser source in OBS with this URL.
```
https://itlwidget.surge.sh/?entrantId=1
```
But replace `?entrantId=1` with your entrant id from the [ITL Online 2022 Leaderboard](https://itl2022.groovestats.com/leaderboard).
Your entrant id should appear in the address bar. ![image](https://user-images.githubusercontent.com/11725545/161716485-54be6c86-030d-4c94-bd52-64143538a243.png)

## Development

This widget was created with `create-react-app`. To start the project locally run `npm run start`.

## Deployment

To build the project run `npm run build`. Deploy to any hosting service, I recommend [surge](https://surge.sh/).
