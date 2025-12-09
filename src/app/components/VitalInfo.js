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
      <div style={{ display: 'flex', gap: '10px', maxWidth: '445px', marginLeft: 'auto' }}>
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