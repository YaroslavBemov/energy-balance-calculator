import { useEffect, useMemo, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Container, Divider, FormControl, InputLabel, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { ColorModeContext, ThemeButton } from './ThemeButton'
import HelpModal from './HelpModal'

import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { gender } from './types'
import { getActivityRatio } from './helpers'

// import './app.css'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))


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
    const totalWeight = event.target.value
    setTotalWeight(totalWeight)
    localStorage.setItem('totalWeight', totalWeight)
  }

  const dryWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dryWeight = event.target.value
    setDryWeight(dryWeight)
    localStorage.setItem('dryWeight', dryWeight)
  }

  const heightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const height = event.target.value
    setHeight(height)
    localStorage.setItem('height', height)
  }

  const ageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const age = event.target.value
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

  const [expanded, setExpanded] = useState<string | false>('panel2')

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
      console.log(event.target)

    }


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="sm">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2 }}>
            <HelpModal />
            <ThemeButton />
          </Box>
        </Container>

        <Container maxWidth="sm" >

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

            {formula == '1' ? <p>С учётом тренировки: {Math.round(+metabolismKanningem * getActivityRatio(gender, lifestyle) * +tef - +expenses)}</p> : null}
            {formula == '2' ? <p>С учётом тренировки: {Math.round(+metabolismTenHaaf * getActivityRatio(gender, lifestyle) * +tef - +expenses)}</p> : null}
            {formula == '3' ? <p>С учётом тренировки: {Math.round(+metabolismTinsley * getActivityRatio(gender, lifestyle) * +tef - +expenses)}</p> : null}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div>

              {/* Мои параметры */}
              {/* <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                  <Typography>Мои параметры</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ mb: 2 }}>
                    Сперва внеси свои параметры.
                    Если вы знаете сухую массу тела, тогда достаточно внести общую массу и сухую.
                  </Typography> */}

              {/* Общая масса тела */}
              <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                <TextField
                  value={totalWeight}
                  onChange={totalWeightChange}
                  label="Общая масса тела"
                  id="outlined-start-adornment"
                  sx={{ width: '25ch' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">кг</InputAdornment>,
                  }}
                />
              </FormControl>

              {/* Сухая масса тела */}
              <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                <TextField
                  value={dryWeight}
                  onChange={dryWeightChange}
                  label="Сухая масса тела"
                  id="outlined-start-adornment"
                  sx={{ width: '25ch' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">кг</InputAdornment>,
                  }}
                />
              </FormControl>

              {/* <Divider /> */}

              {/* Рост */}
              <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                <TextField
                  value={height}
                  onChange={heightChange}
                  label="Рост"
                  id="outlined-start-adornment"
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
                  id="outlined-start-adornment"
                  sx={{ width: '25ch' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">лет</InputAdornment>,
                  }}
                />
              </FormControl>

              {/* Пол */}
              <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Пол</InputLabel>
                <Select
                  value={gender}
                  onChange={genderChange}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Gender"
                  sx={{ width: '25ch' }}
                >
                  <MenuItem value={1}>Мужской</MenuItem>
                  <MenuItem value={0}>Женский</MenuItem>
                </Select>
              </FormControl>

              {/* </AccordionDetails>
              </Accordion> */}

              {/* Определение метаболизма покоя */}
              {/* <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography>Определение метаболизма покоя</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ mb: 1 }}>
                    Сперва определи примерный уровень сухой массы тела.
                    Это можно определить по замерам тела с неплохой точнотью при помощи <a href='https://www.bizcalcs.com/body-fat-navy/' rel='noopener, noreferrer'>US Navy Formyla</a>. Формула работает достаточно точно для людей с отсутсвующим либо совсем небольшим (1-6 месяцев) тренировочным опытом, у кого % жира и мышц находятся в стандартных переделах.
                    В случае более высокого опыта, объемы тела могут увеличиваться за счет мышц, а это искажает результаты формулы. Если вы занимаетесь более 6 месяцев, используйте результаты биоимпеданса для определения количества сухой массы тела и % подкожного жира.
                  </Typography>
                  <Typography>
                    Каннингем - универсальная формула для большинства.
                  </Typography>
                  <Typography>
                    Тен Хааф - на случай, если нет совсем никакого способа определения процента жира.
                  </Typography>
                  <Typography>
                    Тинсли - только для очень сухих (меньше 10% жира для мужчин и 15% для женщин.)
                  </Typography> */}
              {/* <Divider sx={{ m: 1 }} /> */}

              {/* Формула */}
              <FormControl variant="outlined" sx={{ mt: 2, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Формула</InputLabel>
                <Select
                  value={formula}
                  onChange={formulaChange}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Formula"
                  sx={{ width: '25ch' }}
                >
                  <MenuItem value={1}>Каннингем</MenuItem>
                  <MenuItem value={2}>Тен Хааф</MenuItem>
                  <MenuItem value={3}>Тинсли</MenuItem>
                </Select>
              </FormControl>

              {/* </AccordionDetails>
              </Accordion> */}
              <Divider sx={{ m: 1 }} />
              {/* Коэффициент уровня активности */}
              {/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                  <Typography>Коэффициент уровня активности</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Полученные цифры отражают ваш метаболизм ПОКОЯ. Это состояние при котором вы лежите, не двигаетесь, не чешитесь, не едите и не пьете. Делаем поправку на активность. Теперь надо цифру метаболизма покоя умножить на один из коэффициентов.
                  </Typography> */}

              <FormControl variant="outlined" sx={{ mt: 2, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-label">Уровень активности</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={lifestyle}
                  label="Lifestyle"
                  onChange={lifestyleChange}
                >
                  <MenuItem value={1}>Сидячий образ жизни</MenuItem>
                  <MenuItem value={2}>Низкая активность</MenuItem>
                  <MenuItem value={3}>Активный образ жизни</MenuItem>
                  <MenuItem value={4}>Очень активный образ жизни</MenuItem>
                </Select>
              </FormControl>

              {/* </AccordionDetails>
              </Accordion> */}
              <Divider sx={{ m: 1 }} />
              {/* Термический эффект пищи */}
              {/* <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                  <Typography>Термический эффект пищи</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    ТЭП важный коэффициент, который не учитиывают большинство формул и подсчетов. Это энергия, которая уходит на то, чтобы переварить и усвоить еду, которую мы потребляем. Так как высокий % жира связан с низкой эффективностью пищеварения, почти вся полученная энергия из еды будет усвоена. Поэтому нужно снова учесть коэффициенты.
                  </Typography> */}

              <FormControl variant="outlined" sx={{ mt: 2, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-label">Процент жира в организме</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tef}
                  label="tef"
                  onChange={tefChange}
                >
                  <MenuItem value={1.25}>{gender == '1' ? '5-15' : '12-20'}</MenuItem>
                  <MenuItem value={1.19}>{gender == '1' ? '15-23' : '20-25'}</MenuItem>
                  <MenuItem value={1.1}>{gender == '1' ? '23-27' : '25-30'} и более</MenuItem>
                </Select>
              </FormControl>

              {/* </AccordionDetails>
              </Accordion> */}
              <Divider sx={{ m: 1 }} />
              {/* Cиловые тренировки */}
              {/* <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                  <Typography>Cиловые тренировки</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Силовые тренировки сложны в подсчетах, так как они неравномерны по нагрузке и времени. Сперва мы делаем упражнение 30-50 секунд, а затем отдыхаем, часто не производя никакой активности. Усталость, которая возникает вследствие силовой тренировки создает ощущение сильных энергопотерь, но как правило силовая тренировка отнимает от 300 до 500 калорий и не более. По разным исследованиям складывается картина, что во время силовой тренировки тратится 6-7 Кк в минуту. Чтобы индивидуализировать подсчет мы сделаем поправку на вес и возьмем коэффициент 0.1 Кк/1кг/1мин.
                  </Typography> */}

              <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                <TextField
                  value={sets}
                  onChange={setsChange}
                  label="Кол-во подходов за тренировку"
                  id="outlined-start-adornment"
                  sx={{ width: '25ch' }}
                />
              </FormControl>

              {/* </AccordionDetails>
              </Accordion> */}

            </div>

          </Box>

        </Container>
      </ThemeProvider >
    </ColorModeContext.Provider>
  )
}

export default App
