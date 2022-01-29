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
  Motiv,
  CardWrapper,
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
    setIsLoading(true)
    fetch("https://vineet-striker-app.herokuapp.com/mystrike", {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
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

  const previousDayCard = () => {
    if(strikeData?.last_strike===null){
      if(strikeData?.current_strike!==null){
        return (
          <DayCard>
            <Motiv>{strikeData?.current_strike?.hit ? "Wooo!!..There is no stopping" : "It's okay, keep going..."}</Motiv>
            <CardWrapper>
              <DateText>
                {format(new Date(strikeData?.current_strike?.date), "MMM d, yyyy") ||
                  "--"}
              </DateText>
              <Day>
                {format(new Date(strikeData?.current_strike?.date), "EEEE") || "--"}
              </Day>
              <Actions>{strikeData?.current_strike?.hit ? (
                <ActionButton disabled={true}>
                  <img alt="check icon" src={Check} />
                </ActionButton>
                ) : (
                  <ActionButton disabled={true}>
                    <img alt="cross icon" src={Cross} />
                  </ActionButton>
                )}
              </Actions>
            </CardWrapper>
          </DayCard>
        )
      }
      else {
        return null
      }
    } else {
      return (
        <DayCard>
          <Motiv>{strikeData?.last_strike?.hit ? "Wooo!!..There is no stopping" : "It's okay, keep going..."}</Motiv>
          <CardWrapper>
            <DateText>
              {format(new Date(strikeData?.last_strike?.date), "MMM d, yyyy") ||
                "--"}
            </DateText>
            <Day>
              {format(new Date(strikeData?.last_strike?.date), "EEEE") || "--"}
            </Day>
            <Actions>{strikeData?.last_strike?.hit ? (
              <ActionButton disabled={true}>
                <img alt="check icon" src={Check} />
              </ActionButton>
              ) : (
                <ActionButton disabled={true}>
                  <img alt="cross icon" src={Cross} />
                </ActionButton>
              )}
            </Actions>
          </CardWrapper>
        </DayCard>
      )
    }
  }
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
        {strikeData !== null && previousDayCard()}
        <DayCard>
          <Motiv>Make the best of today.!</Motiv>
          <CardWrapper>
            <DateText>{format(new Date(), "MMM d, yyyy") || "--"}</DateText>
            <Day>{format(new Date(), "EEEE") || "--"}</Day>
            <Actions>
              <ActionButton onClick={() => handleAction(false)}>
                <img alt="cross icon" src={Cross} />
              </ActionButton>
              <ActionButton onClick={() => handleAction(true)}>
                <img alt="check icon" src={Check} />
              </ActionButton>
            </Actions>
          </CardWrapper>
        </DayCard>
        <DayCard>
          <Motiv>...and tomorrow..!!</Motiv>
          <CardWrapper>
            <DateText>
              {format(addDays(new Date(), 1), "MMM d, yyyy") || "--"}
            </DateText>
            <Day>{format(addDays(new Date(), 1), "EEEE") || "--"}</Day>
            <Actions>
              <ActionButton disabled={true}>
                <img alt="cross icon" src={Cross} />
              </ActionButton>
              <ActionButton disabled={true}>
                <img alt="check icon" src={Check} />
              </ActionButton>
            </Actions>
          </CardWrapper>
        </DayCard>
      </CardContainer>
    </div>
  );
}

export default App;
