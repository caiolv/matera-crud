import { Backdrop, Modal, Stack } from '@mui/material';

import {
  CancelButton,
  ConfirmationButton,
  ModalContainer,
  ModalContent,
  Text,
} from './styles';

interface IConfirmationModal {
  open: boolean;
  handleClose: VoidFunction;
  confirmAction: VoidFunction;
  cancelAction: VoidFunction;
}

export default function ConfirmationModal({
  open,
  handleClose,
  confirmAction,
  cancelAction,
}: IConfirmationModal) {
  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <ModalContainer>
        <ModalContent>
          <Stack>
            <Text>Deseja confirmar a ação?</Text>
            <Stack flexDirection="row" gap={2} sx={{ marginTop: '1rem' }}>
              <CancelButton variant="outlined" onClick={() => cancelAction()}>
                Cancelar
              </CancelButton>
              <ConfirmationButton
                variant="contained"
                color="error"
                onClick={() => confirmAction()}
              >
                Confirmar
              </ConfirmationButton>
            </Stack>
          </Stack>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}
