import { Component, OnInit } from '@angular/core';
import { IplserviceService } from '../../services/iplservice.service';
import { Iplplayer } from '../../model/iplplayer';
import { TeamStructure } from 'src/app/model/team-structure';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {

  constructor(private iplService: IplserviceService,
    private activatedRoute: ActivatedRoute) { }
  maxWk: number = 1;
  maxBat: number = 5;
  maxAr: number = 3;
  maxBowl: number = 5;
  team1: TeamStructure = new TeamStructure();
  team2: TeamStructure = new TeamStructure();
  team3: TeamStructure = new TeamStructure();
  team4: TeamStructure = new TeamStructure();
  team5: TeamStructure = new TeamStructure();
  team6: TeamStructure = new TeamStructure();
  activeTeam: TeamStructure = new TeamStructure();
  team1Json: any;
  team2Json: any;
  wkDisabled = false;
  batDisabled = false;
  arDisabled = false;
  bowlDisabled = false;
  disabledTeam: string;
  remainingCredits: number = 100;
  t1: string;
  t2: string;
  selectedCaptian: string;
  selectedViceCaptian: string;
  
  allTeams = [
    { "teamName": "Team 1", "value": "team1" },
    { "teamName": "Team 2", "value": "team2" },
    { "teamName": "Team 3", "value": "team3" },
    { "teamName": "Team 4", "value": "team4" },
    { "teamName": "Team 5", "value": "team5" },
    { "teamName": "Team 6", "value": "team6" }];

  selectedTeam: string = "team1";

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.t1 = params['t1'];
      this.t2 = params['t2'];
      this.team1Json = {'teamName' : this.t1, "count" : 0};
      this.team2Json = {'teamName' : this.t2, "count" : 0};
      return this.iplService.getPLayersByTeam(this.t1, this.t2).subscribe((res) => {

        res.forEach(item => item["selected"] = 0);
        res.forEach(item => item["captain"] = 0);
        res.forEach(item => item["viceCaptain"] = 0);

        this.team1.teamWiseSelectedPlayersCount.push(this.team1Json);
        this.team1.teamWiseSelectedPlayersCount.push(this.team2Json);
        this.team2.teamWiseSelectedPlayersCount.push(this.team1Json);
        this.team2.teamWiseSelectedPlayersCount.push(this.team2Json);
        this.team3.teamWiseSelectedPlayersCount.push(this.team1Json);
        this.team3.teamWiseSelectedPlayersCount.push(this.team2Json);
        this.team4.teamWiseSelectedPlayersCount.push(this.team1Json);
        this.team4.teamWiseSelectedPlayersCount.push(this.team2Json);
        this.team5.teamWiseSelectedPlayersCount.push(this.team1Json);
        this.team5.teamWiseSelectedPlayersCount.push(this.team2Json);
        this.team6.teamWiseSelectedPlayersCount.push(this.team1Json);
        this.team6.teamWiseSelectedPlayersCount.push(this.team2Json);

        this.team1.addPlayers(JSON.parse(JSON.stringify(res)));
        this.team2.addPlayers(JSON.parse(JSON.stringify(res)));
        this.team3.addPlayers(JSON.parse(JSON.stringify(res)));
        this.team4.addPlayers(JSON.parse(JSON.stringify(res)));
        this.team5.addPlayers(JSON.parse(JSON.stringify(res)));
        this.team6.addPlayers(JSON.parse(JSON.stringify(res)));

        this.activeTeam = Object.assign({}, this.team1);
        

      })
    })
  }

  updatePlayerSelection(player: Iplplayer, teamStructure: TeamStructure) {
    for (let eachPlayer of teamStructure.allPlayers) {
      if (eachPlayer.player_id == player.player_id) {
        if (player.selected == 0) {
          eachPlayer.selected = 1;
          break;
        }
        else {
          eachPlayer.selected = 0;
          break;
        }

      }
    }
    this.updatePlayerSelectioInfo(teamStructure);
  }

  updatePlayerSelectioInfo(teamStructure: TeamStructure) {
    teamStructure.selectedPlayers = [];
    var wkCount: number = 0;
    var batCount: number = 0;
    var arCount: number = 0;
    var bowlCount: number = 0;
    var t1PlayerCount = 0, t2PlayerCount = 0;
    this.wkDisabled = false;
    this.batDisabled = false;
    this.arDisabled = false;
    this.bowlDisabled = false;
    // Update the player selection count
    for (let eachPlayer of teamStructure.allPlayers) {
      if (eachPlayer.selected == 1) {
        if (eachPlayer.player_type == "WK")
          wkCount++;

        else if (eachPlayer.player_type == "BAT")
          batCount++;

        else if (eachPlayer.player_type == "AR")
          arCount++;

        else if (eachPlayer.player_type == "BOWL")
          bowlCount++;
      }
    }
    teamStructure.selectedWks = wkCount;
    teamStructure.selectedBats = batCount;
    teamStructure.selectedArs = arCount;
    teamStructure.selectedBowls = bowlCount;
    teamStructure.selectedPlayersCount = wkCount + batCount + arCount + bowlCount;
    teamStructure.selectedPlayersCredits = this.getSelctedPlayerCreditCount(teamStructure);
    this.remainingCredits = 100 - teamStructure.selectedPlayersCredits;
    if (wkCount == 1)
      this.wkDisabled = true;
    if (batCount == 5)
      this.batDisabled = true;
    if (arCount == 2)
      this.arDisabled = true;
    if (bowlCount == 5)
      this.bowlDisabled = true;

    for (let eachPlayer of teamStructure.allPlayers) {
      if (eachPlayer.selected == 1) {
        teamStructure.selectedPlayers.push(eachPlayer);
      }
      if(eachPlayer.captain == 1) {
        this.selectedCaptian = eachPlayer.player_name;
      }
      if(eachPlayer.viceCaptain == 1) {
        this.selectedViceCaptian = eachPlayer.player_name;
      }
    }

    for (let eachPlayer of teamStructure.selectedPlayers) {
      if(eachPlayer.player_team == this.t1) {
        t1PlayerCount++;
      }
      if(eachPlayer.player_team == this.t2) {
        t2PlayerCount++;
      }
  }
  this.disabledTeam = "";
  if(t1PlayerCount >= 7) {
    this.disabledTeam = this.t1;
  }
  if(t2PlayerCount >= 7) {
    this.disabledTeam = this.t2;
  }
  for(let eachTeam of teamStructure.teamWiseSelectedPlayersCount) {
    if(eachTeam.teamName == this.t1){
      eachTeam.count = t1PlayerCount;
    }
    if(eachTeam.teamName == this.t2) {
      eachTeam.count = t2PlayerCount;
    }
  }
}

  updatedSelectedTeam(selectedTeam: string) {
    this.selectedTeam = selectedTeam;
    this.activeTeam = this.getTeamObject(selectedTeam);

    this.updatePlayerSelectioInfo(this.activeTeam);
  }

  getSelctedPlayerCreditCount(teamStructure: TeamStructure): number {
    var total: number = 0;
    for (let eachPlayer of teamStructure.allPlayers) {
      if (eachPlayer.selected == 1)
        total += Number(eachPlayer.player_credit);
    }
    return total;
  }

  updatePlayerRole(playerName: string, role: string, teamStructure: TeamStructure) {
    for (let eachPlayer of teamStructure.allPlayers) {
        if(role == "captain")
        {
          if(playerName.includes(eachPlayer.player_name)) {
            eachPlayer.captain = 1;
          }
          else {
            eachPlayer.captain = 0;
          }
        }
        if(role == "viceCaptain")
        {
          if(playerName.includes(eachPlayer.player_name)) {
            eachPlayer.viceCaptain = 1;
          }
          else {
            eachPlayer.viceCaptain = 0;
          }
        }
      }
  }

  getTeamObject(team: string) {
    if (team.includes("team1"))
      return this.team1;
    else if (team.includes("team2"))
      return this.team2;
    else if (team.includes("team3"))
      return this.team3;
    else if (team.includes("team4"))
      return this.team4;
    else if (team.includes("team5"))
      return this.team5;
    else if (team.includes("team6"))
      return this.team6;
  }
}
