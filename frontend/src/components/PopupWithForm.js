export function PopupWithForm({
  isPopupOpen,
  onClose,
  onSubmit,
  name,
  title,
  buttonText,
}) {
  console.log('props on the popup form', onClose);
  return (
    <section
      id={name}
      className={isPopupOpen ? 'popup edit popup_active' : 'popup edit'}
    >
      <form name={name} onSubmit={onSubmit} className='edit__form'>
        <h3 className='edit__title'>{title}</h3>
        <button type='submit' className='edit__submit-btn'>
          {buttonText}
        </button>
        <button id={name} onClick={onClose} className='popup__close'></button>
      </form>
      <div id={`${name}__overlay`} className='popup__overlay'></div>
    </section>
  );
}
