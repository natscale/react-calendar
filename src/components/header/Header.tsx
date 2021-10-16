/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo } from 'react';

import { HeaderProps } from '../../utils/types';

import { NATIVE_INDEX_TO_LABEL_MONTHS_MAP } from '../../utils/constants';

const header = {
  root: {
    height: '12%',
    padding: '1% 2%',
    display: 'flex',
    alignTtems: 'center',
    width: '100%',
  },
  rc_header_nav: { width: '10.14%', height: '100%', flex: '0 0 auto' },
  rch_header_label: {
    width: '65.21%',
    height: '100%',
    margin: '0 4.34%',
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function HeaderComponent({
  onClickPrev,
  onChangeViewType,
  showDualCalendar,
  isSecondary,
  onClickNext,
  viewType,
  monthInView: viewingMonth,
  yearInView: viewingYear,
  yearMatrixEnd,
  yearMatrixStart,
}: HeaderProps) {
  return (
    <header style={header.root} className="rc_header">
      {showDualCalendar && isSecondary ? null : (
        <button
          type="button"
          style={header.rc_header_nav}
          className="rc_header_nav rc_header_nav-prev"
          onClick={onClickPrev}
        >
          <span>←</span>
        </button>
      )}
      {viewType === 'month_dates' ? (
        <button
          type="button"
          style={header.rch_header_label}
          className="rc_header_label rc_header_label-days-of-month"
          onClick={() => !isSecondary && onChangeViewType('years')}
        >
          <div>
            <span>{NATIVE_INDEX_TO_LABEL_MONTHS_MAP[viewingMonth]}</span>
          </div>
          <div>
            <span>{viewingYear}</span>
          </div>
        </button>
      ) : viewType === 'months' ? (
        <button type="button" style={header.rch_header_label} className="rc_header_label rc_header_label-months">
          <div onClick={() => !isSecondary && onChangeViewType('years')}>
            <span>{viewingYear}</span>
          </div>
        </button>
      ) : (
        <button
          type="button"
          style={header.rch_header_label}
          className="rc_header_label rc_header_label-years"
          onClick={() => !isSecondary && onChangeViewType('month_dates')}
        >
          <div>
            <span>
              {yearMatrixStart}-{yearMatrixEnd}
            </span>
          </div>
        </button>
      )}
      {showDualCalendar && !isSecondary && viewType === 'month_dates' ? null : (
        <button
          type="button"
          style={header.rc_header_nav}
          className="rc_header_nav rc_header_nav-next"
          onClick={onClickNext}
        >
          <span>→</span>
        </button>
      )}
    </header>
  );
}

export const Header = memo(HeaderComponent);
