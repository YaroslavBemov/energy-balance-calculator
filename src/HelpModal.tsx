import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  overflow:'auto',
  maxHeight: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function HelpModal() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button variant='outlined' onClick={handleOpen}>Справка</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          {/* Experience */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Тренировочный стаж
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1, mb: 3 }}>
            Нужно выбрать уровень тренировонности мышц: начинающий, уверенный или продвинутый.
          </Typography>

          {/* Lifestyle */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Восстановление
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            В первую очередь это относится к факторам образа жизни, а именно к уровню стресса и качеству сна.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            0,5 = напряженный образ жизни с хроническим недосыпанием. Примеры: инвестиционные банкиры, начинающие предприниматели, студенты в период экзаменов, молодые родители. У большинства людей, занятых на работе с 9 до 5, коэффициент восстановления скорее всего будет отрицательным (ниже 1).
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            1 = отсутствие серьезных жизненных стрессов, хорошее качество сна, высокий уровень благополучия. Пример: студент вне экзаменационных периодов.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1, mb: 3 }}>
            1,2 = отсутствие серьезных стрессов, отличное качество сна. Пример: профессиональный спортсмен в межсезонье или трудящийся в отпуске.
          </Typography>

          {/* Balance */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Энергетический баланс
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Например, дефицит энергии 20% означает, что коэффициент энергетического баланса равен 0,8. Избыток энергии в 10% означает, что коэффициент энергетического баланса равен 1,1.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
