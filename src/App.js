import React, { useState, useEffect } from "react";
import "./App.css";
import { format, addDays } from "date-fns";

import Check from "./assets/check-strike.svg";
import Cross from "./assets/cancel-strike.svg";

import {
  Title,
  Percent,
  Strike,
  CardContainer,
  DayCard,
  DateText,
  Day,
  Actions,
  ActionButton,
  LoaderContainer,
  Loader
} from "./styled";

function App() {
  const [strikeData, setStrikeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    fetch("https://vineet-striker-app.herokuapp.com/mystrike", {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    })
      .then((res) => res.json())
      .then((jsonres) => setStrikeData(jsonres))
      .catch((err) => console.log(err));
  }, []);

  const handleAction = (hit) => {
    setIsLoading(true)
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
     }
    const body = {
      hit: hit,
      date: new Date().toISOString()
    }

    fetch("https://vineet-striker-app.herokuapp.com/mystrike", {
      method: "PATCH",
      headers: headersList,
      body: JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((jsonres) => {
      setStrikeData(jsonres)
      setIsLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setIsLoading(false)
    });
  };
  return (
    <div className="App">
      {isLoading && 
        <>
          <LoaderContainer>
          </LoaderContainer>
          <Loader></Loader>
        </>
      }
      <Title>Striker</Title>
      <Strike>
        {strikeData?.total ? Math.round((strikeData.strike/strikeData.total)*100) : 0}<Percent>%</Percent>
      </Strike>
      <CardContainer>
        {strikeData !== null && strikeData.last_strike !== null ? (
          <DayCard>
            <DateText>
              {format(new Date(strikeData?.last_strike?.date), "MMM d, yyyy") ||
                "--"}
            </DateText>
            <Day>
              {format(new Date(strikeData?.last_strike?.date), "EEEE") || "--"}
            </Day>
            <Actions>
              <ActionButton>
                <img src={Cross} />
              </ActionButton>
              <ActionButton>
                <img src={Check} />
              </ActionButton>
            </Actions>
          </DayCard>
        ) : null}
        <DayCard>
          <DateText>{format(new Date(), "MMM d, yyyy") || "--"}</DateText>
          <Day>{format(new Date(), "EEEE") || "--"}</Day>
          <Actions>
            <ActionButton onClick={() => handleAction(false)}>
              <img src={Cross} />
            </ActionButton>
            <ActionButton onClick={() => handleAction(true)}>
              <img src={Check} />
            </ActionButton>
          </Actions>
        </DayCard>
        <DayCard>
          <DateText>
            {format(addDays(new Date(), 1), "MMM d, yyyy") || "--"}
          </DateText>
          <Day>{format(addDays(new Date(), 1), "EEEE") || "--"}</Day>
          <Actions>
            <ActionButton>
              <img src={Cross} />
            </ActionButton>
            <ActionButton>
              <img src={Check} />
            </ActionButton>
          </Actions>
        </DayCard>
      </CardContainer>
    </div>
  );
}

export default App;
