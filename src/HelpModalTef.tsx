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

export default function HelpModalTef() {
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
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb: 1}}>
            Термический эффект пищи
          </Typography>
          <Typography id="modal-modal-description">
            ТЭП важный коэффициент, который не учитиывают большинство формул и подсчетов.
            Это энергия, которая уходит на то, чтобы переварить и усвоить еду, которую мы потребляем.
            Так как высокий процент жира связан с низкой эффективностью пищеварения, почти вся полученная энергия из еды будет усвоена.
            Поэтому нужно снова учесть коэффициенты.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
