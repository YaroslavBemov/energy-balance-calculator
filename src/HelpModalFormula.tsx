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

export default function HelpModalFormula() {
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
            Определение метаболизма покоя
          </Typography>
          <Typography id="modal-modal-description">
            Каннингем - универсальная формула для большинства.
            <Divider sx={{ m: 1 }} />
            Тен Хааф - на случай, если нет совсем никакого способа определения процента жира.
            <Divider sx={{ m: 1 }} />
            Тинсли - только для очень сухих (меньше 10% жира для мужчин и 15% для женщин.)
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
