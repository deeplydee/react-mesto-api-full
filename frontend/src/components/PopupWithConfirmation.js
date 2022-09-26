import PopupWithForm from './PopupWithForm';

function PopupWithConfirmation({ isOpen, onClose, onSubmit, card, isLoading }) {
  function handleDeleteConfirmation(evt) {
    evt.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="сonfirmation"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteConfirmation}
      isLoading={isLoading}
      textButton={!isLoading ? 'Да' : 'Удаление...'}
    ></PopupWithForm>
  );
}

export default PopupWithConfirmation;
