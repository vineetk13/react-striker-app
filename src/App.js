import React, { useState, useEffect } from "react";
import "./App.css";
import { format, addDays } from "date-fns";

import Check from "./assets/check-strike.svg";
import Cross from "./assets/cancel-strike.svg";

import {
  Title,
  Snackbar,
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
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarText, setSnackbarText] = useState("Some random text here...");

  const getFullDate = (date) => {
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  }

  const isTodayHit = () => {
    if(getFullDate(new Date(strikeData?.current_strike?.date))===getFullDate(new Date()) && strikeData?.current_strike?.hit)
      return true
    else
      return false
  }

  const showSnackbar = () => {
    var x = document.getElementById("snackbar");

    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

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

    setSnackbarText(hit ? "Great🎉...Keep going..!!" : "Ohh that's okay...It's a journey 💖")

    fetch("https://vineet-striker-app.herokuapp.com/mystrike", {
      method: "PATCH",
      headers: headersList,
      body: JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((jsonres) => {
      setStrikeData(jsonres)
      setIsLoading(false)
      showSnackbar()
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
            <Motiv>{strikeData?.current_strike?.hit ? "Wooo!!..There is no stopping" : "Certainly not the end"}</Motiv>
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
          <Motiv>{strikeData?.last_strike?.hit ? "Wooo!!..There is no stopping" : "Certainly not the end"}</Motiv>
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
      <Snackbar id="snackbar">{snackbarText}</Snackbar>
      {isLoading && 
        <>
          <LoaderContainer>
          </LoaderContainer>
          <Loader></Loader>
        </>
      }
      <Title>STRIKER</Title>
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
              {getFullDate(new Date(strikeData?.current_strike?.date))===getFullDate(new Date()) ? (
                isTodayHit ? (<ActionButton 
                  disabled={true} 
                >
                  <img alt="check icon" src={Check} />
                </ActionButton>) : (
                  <ActionButton 
                    disabled={true} 
                  >
                    <img alt="cross icon" src={Cross} />
                  </ActionButton>
                )
              ) : (
                <>
                  <ActionButton 
                    disabled={isTodayHit()} 
                    onClick={() => handleAction(false)}
                    style={{cursor:!isTodayHit() ? "not-allowed" : "auto"}}
                  >
                    <img alt="cross icon" src={Cross} />
                  </ActionButton>
                  <ActionButton 
                    disabled={!isTodayHit()} 
                    onClick={() => handleAction(true)}
                    style={{cursor:isTodayHit() ? "not-allowed" : "auto"}}
                  >
                    <img alt="check icon" src={Check} />
                  </ActionButton>
                </>
              )}
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
              <ActionButton>
                <img alt="cross icon" src={Cross} />
              </ActionButton>
              <ActionButton>
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
