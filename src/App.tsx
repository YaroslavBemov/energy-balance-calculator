import { useEffect, useMemo, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Container } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
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
  const [sets, setSets] = useState<number>(0)
  const [experience, setExperience] = useState<string>('1')


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

  const experienceChange = (event: SelectChangeEvent) => {
    const experience = event.target.value
    setExperience(experience)
    localStorage.setItem('experience', experience)
  }

  useEffect(() => {
    const experience = localStorage.getItem('experience')
    if (experience) {
      setExperience(experience)
    }
  }, [])

  useEffect(() => {
    setSets(Math.round(Math.sqrt(+experience)))
  }, [experience])

  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
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
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div>

              {/* Определение метаболизма покоя */}
              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography>Определение метаболизма покоя</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Сперва определи примерный уровень сухой массы тела.
                    Это можно определить по замерам тела с неплохой точнотью при помощи <a href='https://www.bizcalcs.com/body-fat-navy/' rel='noopener, noreferrer'>US Navy Formyla</a>. Формула работает достаточно точно для людей с отсутсвующим либо совсем небольшим (1-6 месяцев) тренировочным опытом, у кого % жира и мышц находятся в стандартных переделах.
                    В случае более высокого опыта, объемы тела могут увеличиваться за счет мышц, а это искажает результаты формулы. Если вы занимаетесь более 6 месяцев, используйте результаты биоимпеданса для определения количества сухой массы тела и % подкожного жира.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Коэффициент уровня активности */}
              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                  <Typography>Коэффициент уровня активности</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Полученные цифры отражают ваш метаболизм ПОКОЯ. Это состояние при котором вы лежите, не двигаетесь, не чешитесь, не едите и не пьете. Делаем поправку на активность. Теперь надо цифру метаболизма покоя умножить на один из коэффициентов.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Термический эффект пищи */}
              <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                  <Typography>Термический эффект пищи</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    ТЭП важный коэффициент, который не учитиывают большинство формул и подсчетов. Это энергия, которая уходит на то, чтобы переварить и усвоить еду, которую мы потребляем. Так как высокий % жира связан с низкой эффективностью пищеварения, почти вся полученная энергия из еды будет усвоена. Поэтому нужно снова учесть коэффициенты.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Cиловые тренировки */}
              <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                  <Typography>Cиловые тренировки</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Силовые тренировки сложны в подсчетах, так как они неравномерны по нагрузке и времени. Сперва мы делаем упражнение 30-50 секунд, а затем отдыхаем, часто не проихводя никакой активности. Усталость, которая возникает вследствие силовой тренировки создает ощущение сильных энергопотерь, но как правило силовая тренировка отнимает от 300 до 500 калорий и не более. По разным исследованиям складывается картина, что во время силовой тренировки тратится 6-7 Кк в минуту. Чтобы индивидуальизировать подсчет мы сделаем поправку на вес и возьмем коэффициент 0.1 Кк/1кг/1мин.
                  </Typography>
                </AccordionDetails>
              </Accordion>

            </div>

          </Box>

        </Container>
      </ThemeProvider >
    </ColorModeContext.Provider>
  )
}

export default App
