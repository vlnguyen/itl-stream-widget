import React, { useCallback, useEffect, useMemo, useState } from "react";
import Axios from "axios";
import classNames from "classnames";
import "./App.css";

class Entrant {
  constructor(data: any) {
    this.id = data.entrant_id;
    this.name = data.members_name;
    this.isSelf = data.entrant_is_self;
    this.isRival = data.entrant_is_rival;
    this.profileImgUrl = data.members_profile_img;

    this.rank = data.entrant_rank;
    this.passes = data.entrant_total_songs_pass;
    this.fcs = data.entrant_total_songs_fc;
    this.fecs = data.entrant_total_songs_fec;
    this.quads = data.entrant_total_songs_quad;
    this.quints = data.entrant_total_songs_quint;
    this.rankingPoints = data.entrant_ranking_points;
    this.totalPoints =
      data.entrant_total_song_points + data.entrant_total_bonus_points;
  }
  id: number;
  name: string;
  isSelf: boolean;
  isRival: boolean;
  profileImgUrl: string;

  rank: number;
  passes: number;
  fcs: number;
  fecs: number;
  quads: number;
  quints: number;
  rankingPoints: number;
  totalPoints: number;
}

const clearTypes: { className: string; label: string; key: keyof Entrant }[] = [
  {
    className: "passes",
    label: "Passes:",
    key: "passes",
  },
  {
    className: "fcs",
    label: "FCs:",
    key: "fcs",
  },
  {
    className: "fecs",
    label: "FECs:",
    key: "fecs",
  },
  {
    className: "quads",
    label: "Quads:",
    key: "quads",
  },
  {
    className: "quints",
    label: "Quints:",
    key: "quints",
  },
];

function formatDifference(diff: number) {
  if (diff === 0) {
    return "--";
  }
  if (diff > 0) {
    return `+${diff}`;
  }
  return diff;
}

const App: React.FC = () => {
  const [entrants, setEntrants] = useState<Entrant[]>([]);

  const getStreamerStats = useCallback(async (entrantId: number) => {
    Axios.request({
      url: `https://itl2022.groovestats.com/api/public/getStreamerStats.php?entrantId=${entrantId}`,
    }).then((resp) =>
      setEntrants(
        resp.data.data.entrants.map((entrant: any) => new Entrant(entrant))
      )
    );
  }, []);

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let entrantId = parseInt(params.get("entrantId") || "");
    getStreamerStats(entrantId);

    const interval = setInterval(() => getStreamerStats(entrantId), 60 * 1000);
    return () => clearInterval(interval);
  }, [getStreamerStats]);

  const self = useMemo(() => {
    const index = entrants.findIndex((entrant) => entrant.isSelf);
    return index > -1 ? entrants[index] : null;
  }, [entrants]);

  return (
    self && (
      <div className="bgwrap">
        <div className="wrapper">
          <div>
            <img
              src={self.profileImgUrl}
              width="100px"
              height="100px"
              alt="Avatar"
            />
          </div>
          <div className="entrant_info">
            <div className="entrant_name">{self.name}</div>
            <div className="entrant_id">ID: {self.id}</div>
            <div className="entrant_rank">Rank: {self.rank}</div>
            <div className="entrant_points">
              <div>RP:</div>
              <div></div>
              <div>{self.rankingPoints}</div>
            </div>
            <div className="entrant_points">
              <div>TP:</div>
              <div></div>
              <div>{self.totalPoints}</div>
            </div>
          </div>
          <div className="clear_info">
            {clearTypes.map((clearType) => (
              <div key={clearType.key} className={clearType.className}>
                <div>{clearType.label}</div>
                <div>{self[clearType.key]}</div>
              </div>
            ))}
          </div>
          <div className="ladder">
            <div>ITL Ladder</div>
            {entrants.map((entrant) => (
              <div
                key={entrant.id}
                className={classNames({
                  rival: entrant.isRival,
                  self: entrant.isSelf,
                  neutral: !entrant.isRival && !entrant.isSelf,
                })}
              >
                <div>
                  {entrant.rank}. {entrant.name}
                </div>
                <div>
                  {formatDifference(self.rankingPoints - entrant.rankingPoints)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default App;
