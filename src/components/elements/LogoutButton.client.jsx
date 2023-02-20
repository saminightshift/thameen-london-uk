export function LogoutButton(props) {
  const logout = () => {
    fetch('/account/logout', {method: 'POST'}).then(() => {
      if (typeof props?.onClick === 'function') {
        props.onClick();
      }
      window.location.href = '/';
    });
  };

  return (
    <button className="btn lg-btn-solid" {...props} onClick={logout}>
      Sign out
    </button>
  );
}
