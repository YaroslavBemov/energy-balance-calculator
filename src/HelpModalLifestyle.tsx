import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import HelpIcon from '@mui/icons-material/Help'
import { Divider } from '@mui/material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  overflow: 'auto',
  maxHeight: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function HelpModalLifestyle() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <IconButton color="primary" onClick={handleOpen}>
        <HelpIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
            Коэффициент уровня активности
          </Typography>
          <Typography>
            Как правило, активность оценить нам достаточно трудно, ведь мы склонны её переоценивать.
            Поэтому для надежности есть смысл уменьшить результат, который хочется выбрать вам, на 1 значение.
            Например, с "Активный образ жизни" на "Низкая активность".
            Однако, количество шагов могут сориентировать в коэффициенте.
            Хоть они и не отражают всей активности за день, они отражают большую часть бытовых движений.
          </Typography>
          <Divider sx={{ m: 1 }} />
          <Typography id="modal-modal-description">
            Сидячий образ жизни (меньше 7 500) - например, офисная работа или удалёнка с повседневными делами, которая охватывает стандартные жизненные обязанности: выгул собаки, покупки продуктов и повседневные дела.
            <Divider sx={{ m: 1 }} />
            Низкая активность (7 500 - 9 999) - например, неполный рабочий день в офисе + активный быт или длительная ежедневная поездка на велосипеде.
            <Divider sx={{ m: 1 }} />
            Активный образ жизни (10 000 - 12 500) - буквально на ногах большую часть дня.
            <Divider sx={{ m: 1 }} />
            Очень активный образ жизни (более 12 500 с интенсивными движениями) - ручной труд, физический труд, доставка тяжелых товаров.
          </Typography>

        </Box>
      </Modal>
    </div>
  )
}
