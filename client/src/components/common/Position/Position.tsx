import { css } from "@emotion/react";

export const AbsoluteTop = css({
  position: 'absolute',
  top: '30px',
})
;

export const FixedBot = css({
  position: 'fixed',
  bottom: '50px'
})
;

export const CenterAbsolute = css({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
})

export const PopupAbsolute = css({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
});
