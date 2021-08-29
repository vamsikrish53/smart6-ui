import { Iplplayer } from './iplplayer';

export class TeamStructure {

    selectedPlayersCount: number = 0;
    selectedWks: number = 0;
    selectedBats: number = 0;
    selectedArs: number = 0;
    selectedBowls: number = 0;
    selectedPlayersCredits: number = 0;
    allPlayers: Array<Iplplayer> = [];
    selectedPlayers: Array<Iplplayer> = [];
    teamWiseSelectedPlayersCount: Array<any> = [];
    addPlayers(allPlayers: Array<Iplplayer>) {
        this.allPlayers = allPlayers;
    }
}
