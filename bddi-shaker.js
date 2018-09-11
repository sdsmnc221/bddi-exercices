const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class BDDIShaker {
    constructor() {
        let DEV,
            DES,
            avgTeamNbDev,
            avgTeamNbDes,
            teamNb,
            teams;

        async function init() {
            console.log('The BDDI Shaker is turned on.');
            DEV = await askInputTeamList('dev');
            DES = await askInputTeamList('des');
            avgTeamNbDev = await askInputAvgTeamNb('dev');
            avgTeamNbDes = await askInputAvgTeamNb('des');
            teamNb = calculateTeamNb();
            teams = generateTeams();
        }

        function askInputTeamList(mode) {
            return new Promise( (resolve, reject) => {
                rl.question(`Please enter the list of ${mode.toUpperCase()} team, each member seperated by a coma ' , '. \r\n`, 
                    input => {
                        const team = input.split(',')
                                          .map(e => e.trim())
                                          .filter(e => e !== '');
                        resolve(shuffle(team));
                    }
                );
            });
        }

        function askInputAvgTeamNb(mode) {
            return new Promise( (resolve, reject) => {
                rl.question(`How many ${mode} each team will have? Please enter a VALID team's average number of members. \r\n`, 
                    input => {
                        const inputNb = parseInt(input);
                        if (isNaN(inputNb)) {
                            askInputAvgTeamNb();
                        } else {
                            resolve(inputNb);
                        }
                    }
                );
            });
        }

        function calculateTeamNb() {
            let _dev = DEV.length/avgTeamNbDev,
                _des = DES.length/avgTeamNbDes,
                teamNb,
                rest,
                avgTeamNb,
                result = {
                    'exact': 0,
                    'exact+1': 0
                };

            if (_dev > _des) {
                teamNb = parseInt(_des);
                rest = DEV.length - _dev;
            } else {
                teamNb = parseInt(_dev);
                rest = DES.length - _des;
            }

            avgTeamNb = avgTeamNbDes + avgTeamNbDev;
            result['exact+1'] = rest;
            result['exact'] = teamNb-rest;

            console.log(`There will be ${teamNb} of teams: ${result['exact+1']} teams of ${avgTeamNb+1} & ${result['exact']} teams of ${avgTeamNb}`)
            return result;
        }

        function shuffle(array) {
            let currentIndex = array.length,
                temp,
                randomIndex;
            
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                temp = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temp;
            }

            returnarray;
        }

        function generateTeams() {
            // for (let )
        }

        return {
            launch() {
                init();
            }
        }
    }
}

const chatRoomShaker = new BDDIShaker();

chatRoomShaker.launch();