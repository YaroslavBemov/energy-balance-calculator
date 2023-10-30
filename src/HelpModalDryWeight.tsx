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

export default function HelpModalDryWeight() {
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
            Определение сухой массы тела
          </Typography>
          <Typography id="modal-modal-description">
            Сперва определи примерный уровень сухой массы тела (общая масса тела за вычетом массы жировой ткани).
            <Divider sx={{ m: 1 }} />
            Это можно определить по замерам тела с неплохой точностью при помощи <a href='https://www.bizcalcs.com/body-fat-navy/' rel='noopener noreferrer'>US Navy Formyla</a>.
            Формула работает достаточно точно для людей с отсутствующим либо совсем небольшим (1-6 месяцев) тренировочным опытом, у кого процент жира и мышц находятся в стандартных переделах.
            <Divider sx={{ m: 1 }} />
            В случае более высокого опыта, объемы тела могут увеличиваться за счёт мышц, а это искажает результаты формулы.
            Если вы занимаетесь более 6 месяцев, используйте результаты биоимпеданса для определения количества сухой массы тела и процента подкожного жира.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
