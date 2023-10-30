import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import HelpIcon from '@mui/icons-material/Help'

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

export default function HelpModalSets() {
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
            Cиловые тренировки
          </Typography>
          <Typography id="modal-modal-description">
            Силовые тренировки сложны в подсчётах, так как они неравномерны по нагрузке и времени.
            Сперва мы делаем упражнение 30-50 секунд, а затем отдыхаем, часто не производя никакой активности.
            Усталость, которая возникает вследствие силовой тренировки создаёт ощущение сильных энергопотерь,
            но как правило силовая тренировка отнимает от 300 до 500 калорий и не более.
            По разным исследованиям складывается картина, что во время силовой тренировки тратится 6-7 Кк в минуту.
            Чтобы индивидуализировать подсчёт мы сделаем поправку на вес и возьмём коэффициент 0.1 Кк/1кг/1мин.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
