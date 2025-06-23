import { TextField } from "@mui/material"
import { useVitals } from "../context/VitalsContext"
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useRef, useEffect } from "react";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export default function VitalInfo() {
  const { vitals, setVitals } = useVitals()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [playConfetti, setPlayConfetti] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null)
  const { windowWidth, windowHeight } = useWindowSize()
  const [days, setDays] = useState(0)
  let timeout = null

  useEffect(() => {
    setAudio(document.querySelector('audio'))

    const today = new Date();
    const targetDate = new Date(today.getFullYear(), 5, 27);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setDays(diffDays)

    return (() => {
      clearTimeout(timeout)
    })
  }, [])

  const handlePlay = () => {
    setAudio(document.querySelector('audio'))
    audio.play();
    setIsPlaying(true);
    document.querySelector('.confetti-wrapper').classList.remove('fade-out')
    setWidth(windowWidth)
    setHeight(windowHeight)

    timeout = setTimeout(() => {
      handleAudioPause()
      clearTimeout(timeout)
    }, 65000)
  };

  const handleBirthdayCelebration = (event) => {
    setPlayConfetti(!playConfetti)
    if (playConfetti) {
      handlePlay()
    } else {
      handleAudioPause()
    }
  }

  const handleAudioPause = () => {
    document.querySelector('.confetti-wrapper').classList.add('fade-out')
    audio.pause();
    setIsPlaying(false);
    setWidth(0)
    setHeight(0)
    clearTimeout(timeout)
  }

  return (
    <>
      <div className={`banner ${isPlaying ? 'playing' : 'paused'}`}
        style={{ paddingBlock: "10px", position: 'fixed', inset: 'auto 0 0px', height: '100%', maxHeight: '100px' }}>
        <p style={{textAlign: 'center', fontFamily: 'Permanent Marker'}}>0{ days } days until it's your Birthday!</p>
      </div>
      <audio controls src="/happy_birthday_song.mp3" style={{ transform: 'translateY(-500px)'}} />
      <div className="confetti-wrapper">
        {isPlaying ?
        <Confetti
          width={width}
          height={height}
          numberOfPieces={ 400 }
        /> :
        ""
      }
      </div>
      <div style={{ display: 'flex', gap: '10px', maxWidth: '445px', marginLeft: 'auto' }}>
        <button type="button" className="birthday__btn"
          style={{ marginLeft: "auto", marginBlock: "0", minWidth: "170px" }}
          onClick={() => handleBirthdayCelebration()}>
        Happy Birthday 🦄
      </button>
      <div style={{paddingTop: '5px', pointerEvents: 'none'}}>
        <TextField
          label="BMI"
          id="outlined-size-small"
          defaultValue={vitals.bmi}
          size="small"
          slotProps={{
            input: {
              endAdornment: <InputAdornment>kg/m<sup>2</sup></InputAdornment>,
            },
          }}
        />
      </div>
      <div style={{paddingTop: '5px', pointerEvents: 'none'}}>
        <TextField
          label="BMR"
          id="outlined-size-small"
          defaultValue={vitals.bmr}
          size="small"
          slotProps={{
            input: {
              endAdornment: <InputAdornment>cals/day</InputAdornment>,
            },
          }}
        />
      </div>
    </div>
    </>
  )
}