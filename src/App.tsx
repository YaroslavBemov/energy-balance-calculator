import { useEffect, useMemo, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Container, FormControl, InputLabel, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { ColorModeContext, ThemeButton } from './ThemeButton'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { gender } from './types'
import { getActivityRatio } from './helpers'
import HelpModalDryWeight from './HelpModalDryWeight'
import HelpModalSets from './HelpModalSets'
import HelpModalFormula from './HelpModalFormula'
import HelpModalLifestyle from './HelpModalLifestyle'
import HelpModalTef from './HelpModalTef'


function App() {
  const [totalWeight, setTotalWeight] = useState<string>('1')
  const [dryWeight, setDryWeight] = useState<string>('1')
  const [height, setHeight] = useState<string>('1')
  const [age, setAge] = useState<string>('1')
  const [gender, setGender] = useState<gender>('1') // 1 - мужской
  const [lifestyle, setLifestyle] = useState<string>('1')
  const [tef, setTef] = useState<string>('1.25')
  const [metabolismKanningem, setMetabolismKanningem] = useState<string>('0')
  const [metabolismTenHaaf, setMetabolismTenHaaf] = useState<string>('0')
  const [metabolismTinsley, setMetabolismTinsley] = useState<string>('0')
  const [sets, setSets] = useState<string>('1')
  const [formula, setFormula] = useState<string>('1')
  const [expenses, setExpenses] = useState<string>('400')

  const totalWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let totalWeight = event.target.value
    totalWeight = totalWeight.replace(',', '.')
    setTotalWeight(totalWeight)
    localStorage.setItem('totalWeight', totalWeight)
  }

  const dryWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let dryWeight = event.target.value
    dryWeight = dryWeight.replace(',', '.')
    setDryWeight(dryWeight)
    localStorage.setItem('dryWeight', dryWeight)
  }

  const heightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let height = event.target.value
    height = height.replace(',', '.')
    setHeight(height)
    localStorage.setItem('height', height)
  }

  const ageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let age = event.target.value
    age = age.replace(',', '.')
    setAge(age)
    localStorage.setItem('age', age)
  }

  const genderChange = (event: SelectChangeEvent) => {
    const gender = event.target.value
    if (gender == '1' || gender == '0') {
      setGender(gender)
    }
    localStorage.setItem('gender', gender)
  }

  const lifestyleChange = (event: SelectChangeEvent) => {
    const lifestyle = event.target.value
    setLifestyle(lifestyle)
    localStorage.setItem('lifestyle', lifestyle)
  }

  const tefChange = (event: SelectChangeEvent) => {
    const tef = event.target.value
    setTef(tef)
    localStorage.setItem('tef', tef)
  }

  const formulaChange = (event: SelectChangeEvent) => {
    const formula = event.target.value
    setFormula(formula)
    localStorage.setItem('formula', formula)
  }

  const setsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sets = event.target.value
    setSets(sets)
    localStorage.setItem('sets', sets)
  }

  const [mode, setMode] = useState<'light' | 'dark'>('dark')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )


  useEffect(() => {
    const totalWeight = localStorage.getItem('totalWeight')
    if (totalWeight) {
      setTotalWeight(totalWeight)
    }
    const dryWeight = localStorage.getItem('dryWeight')
    if (dryWeight) {
      setDryWeight(dryWeight)
    }
    const height = localStorage.getItem('height')
    if (height) {
      setHeight(height)
    }
    const age = localStorage.getItem('age')
    if (age) {
      setAge(age)
    }
    const gender = localStorage.getItem('gender')
    if (gender == '1' || gender == '0') {
      setGender(gender)
    }
    const lifestyle = localStorage.getItem('lifestyle')
    if (lifestyle) {
      setLifestyle(lifestyle)
    }
    const tef = localStorage.getItem('tef')
    if (tef) {
      setTef(tef)
    }
    const formula = localStorage.getItem('formula')
    if (formula) {
      setFormula(formula)
    }
    const sets = localStorage.getItem('sets')
    if (sets) {
      setSets(sets)
    }
  }, [])

  useEffect(() => {
    setMetabolismKanningem(Math.round(370 + 21.6 * +dryWeight) + '')
    setMetabolismTenHaaf(Math.round((49.94 * +totalWeight + 2459.053 * +height - 34.014 * +age + 799.257 * +gender + 122.502) / 4.184) + '')
    setMetabolismTinsley(Math.round(24.8 * +totalWeight + 10) + '')
    setExpenses(Math.round(0.1 * +totalWeight * (+sets * 2.5)) + '')
  }, [dryWeight, totalWeight, height, age, gender, lifestyle, tef, sets])


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="sm">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ThemeButton />
          </Box>
        </Container>

        <Container maxWidth="sm" >

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
            <h1>TERENTEV<span style={{ color: 'yellow' }}>FIT</span></h1>

            {formula == '1' ? <p>Метаболизм покоя: {metabolismKanningem}</p> : null}
            {formula == '2' ? <p>Метаболизм покоя: {metabolismTenHaaf}</p> : null}
            {formula == '3' ? <p>Метаболизм покоя: {metabolismTinsley}</p> : null}

            {formula == '1' ? <p>С учётом активности: {Math.round(+metabolismKanningem * getActivityRatio(gender, lifestyle))}</p> : null}
            {formula == '2' ? <p>С учётом активности: {Math.round(+metabolismTenHaaf * getActivityRatio(gender, lifestyle))}</p> : null}
            {formula == '3' ? <p>С учётом активности: {Math.round(+metabolismTinsley * getActivityRatio(gender, lifestyle))}</p> : null}

            {formula == '1' ? <p>С учётом ТЭФ: {Math.round(+metabolismKanningem * getActivityRatio(gender, lifestyle) * +tef)}</p> : null}
            {formula == '2' ? <p>С учётом ТЭФ: {Math.round(+metabolismTenHaaf * getActivityRatio(gender, lifestyle) * +tef)}</p> : null}
            {formula == '3' ? <p>С учётом ТЭФ: {Math.round(+metabolismTinsley * getActivityRatio(gender, lifestyle) * +tef)}</p> : null}

            {formula == '1' ? <p>С учётом тренировки: {Math.round(+metabolismKanningem * getActivityRatio(gender, lifestyle) * +tef - +expenses - +metabolismKanningem / 24)}</p> : null}
            {formula == '2' ? <p>С учётом тренировки: {Math.round(+metabolismTenHaaf * getActivityRatio(gender, lifestyle) * +tef - +expenses)}</p> : null}
            {formula == '3' ? <p>С учётом тренировки: {Math.round(+metabolismTinsley * getActivityRatio(gender, lifestyle) * +tef - +expenses)}</p> : null}
          </Box>

          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            [theme.breakpoints.down('sm')]: {
              alignItems: 'center',
              flexDirection: 'column'
            }
          }}>

            {/* Мои параметры */}
            {/* Общая масса тела */}
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
              <TextField
                value={totalWeight}
                onChange={totalWeightChange}
                label="Общая масса тела"
                id="outlined-start-adornment-totalWeight"
                sx={{ width: '25ch' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">кг</InputAdornment>,
                }}
              />
            </FormControl>

            {/* Сухая масса тела */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                <TextField
                  value={dryWeight}
                  onChange={dryWeightChange}
                  label="Сухая масса тела"
                  id="outlined-start-adornment-dryWeight"
                  sx={{ width: '25ch' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">кг</InputAdornment>,
                  }}
                />
              </FormControl>
              <HelpModalDryWeight />
            </Box>

            {/* Рост */}
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
              <TextField
                value={height}
                onChange={heightChange}
                label="Рост"
                id="outlined-start-adornment-height"
                sx={{ width: '25ch' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">м</InputAdornment>,
                }}
              />
            </FormControl>

            {/* Возраст */}
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
              <TextField
                value={age}
                onChange={ageChange}
                label="Возраст"
                id="outlined-start-adornment-age"
                sx={{ width: '25ch' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">лет</InputAdornment>,
                }}
              />
            </FormControl>

            {/* Пол */}
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-label-gender">Пол</InputLabel>
              <Select
                value={gender}
                onChange={genderChange}
                labelId="demo-simple-select-label-gender"
                id="demo-simple-select-gender"
                label="Пол"
                sx={{ width: '25ch' }}
              >
                <MenuItem value={1}>Мужской</MenuItem>
                <MenuItem value={0}>Женский</MenuItem>
              </Select>
            </FormControl>

            {/* Cиловые тренировки */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                <TextField
                  value={sets}
                  onChange={setsChange}
                  label="Кол-во подходов за тренировку"
                  id="outlined-start-adornment-sets"
                  sx={{ width: '25ch' }}
                />
              </FormControl>
              <HelpModalSets />
            </Box>

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Определение метаболизма покоя */}
            {/* Формула */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl variant="outlined" sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-simple-select-label-formula">Формула</InputLabel>
                <Select
                  value={formula}
                  onChange={formulaChange}
                  labelId="demo-simple-select-label-formula"
                  id="demo-simple-select-formula"
                  label="Формула"
                >
                  <MenuItem value={1}>Каннингем</MenuItem>
                  <MenuItem value={2}>Тен Хааф</MenuItem>
                  <MenuItem value={3}>Тинсли</MenuItem>
                </Select>
              </FormControl>
              <HelpModalFormula />
            </Box>

            {/* Коэффициент уровня активности */}

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl variant="outlined" sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-simple-select-label-lifestyle">Уровень активности</InputLabel>
                <Select
                  value={lifestyle}
                  onChange={lifestyleChange}
                  labelId="demo-simple-select-label-lifestyle"
                  id="demo-simple-select-lifestyle"
                  label="Уровень активности"
                >
                  <MenuItem value={1}>Сидячий образ жизни</MenuItem>
                  <MenuItem value={2}>Низкая активность</MenuItem>
                  <MenuItem value={3}>Активный образ жизни</MenuItem>
                  <MenuItem value={4}>Очень активный образ жизни</MenuItem>
                </Select>
              </FormControl>

              <HelpModalLifestyle />
            </Box>
            {/* <Divider sx={{ m: 1 }} /> */}

            {/* Термический эффект пищи */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl variant="outlined" sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-simple-select-label-tef">Процент жира в организме</InputLabel>
                <Select
                  value={tef}
                  onChange={tefChange}
                  labelId="demo-simple-select-label-tef"
                  id="demo-simple-select-tef"
                  label="Процент жира в организме"
                >
                  <MenuItem value={1.25}>{gender == '1' ? '5-15' : '12-20'}</MenuItem>
                  <MenuItem value={1.19}>{gender == '1' ? '15-23' : '20-25'}</MenuItem>
                  <MenuItem value={1.1}>{gender == '1' ? '23-27' : '25-30'} и более</MenuItem>
                </Select>
              </FormControl>
              <HelpModalTef />
            </Box>

            {/* <Divider sx={{ m: 1 }} /> */}



          </Box>

        </Container>
      </ThemeProvider >
    </ColorModeContext.Provider>
  )
}

export default App
