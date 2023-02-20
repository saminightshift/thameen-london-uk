import {IconClose} from '~/components';

export function Modal({children, close}) {
  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      id="modal-bg"
    >
      <div className="fixed inset-0 transition-opacity bg-opacity-75 bg-black/50"></div>
      <div className="fixed inset-0 z-100 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div
            className="relative flex-1 px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform border-black border shadow-xl sm:my-12 sm:flex-none sm:w-full sm:max-w-sm sm:p-6 bg-white"
            role="button"
            onClick={(e) => e.stopPropagation()}
            onKeyPress={(e) => e.stopPropagation()}
            tabIndex={0}
          >
            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button
                type="button"
                className="p-4 -m-4 transition text-black hover:text-black/50"
                onClick={close}
              >
                <IconClose aria-label="Close panel" />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
