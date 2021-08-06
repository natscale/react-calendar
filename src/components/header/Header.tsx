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
  arc_header_nav: { width: '10.14%', height: '100%', flex: '0 0 auto' },
  arch_header_label: {
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
  onClickNext,
  viewType,
  monthInView: viewingMonth,
  yearInView: viewingYear,
  yearMatrixEnd,
  yearMatrixStart,
}: HeaderProps) {
  return (
    <header style={header.root} className="arc_header">
      <button style={header.arc_header_nav} className="arc_header_nav arc_header_nav-prev" onClick={onClickPrev}>
        <span>←</span>
      </button>
      {viewType === 'month_dates' ? (
        <button
          style={header.arch_header_label}
          className="arc_header_label arc_header_label-days-of-month"
          onClick={() => onChangeViewType('years')}
        >
          <div>
            <span>{NATIVE_INDEX_TO_LABEL_MONTHS_MAP[viewingMonth]}</span>
          </div>
          <div>
            <span>{viewingYear}</span>
          </div>
        </button>
      ) : viewType === 'months' ? (
        <button style={header.arch_header_label} className="arc_header_label arc_header_label-months">
          <div onClick={() => onChangeViewType('years')}>
            <span>{viewingYear}</span>
          </div>
        </button>
      ) : (
        <button
          style={header.arch_header_label}
          className="arc_header_label arc_header_label-years"
          onClick={() => onChangeViewType('month_dates')}
        >
          <div>
            <span>
              {yearMatrixStart}-{yearMatrixEnd}
            </span>
          </div>
        </button>
      )}
      <button style={header.arc_header_nav} className="arc_header_nav arc_header_nav-next" onClick={onClickNext}>
        <span>→</span>
      </button>
    </header>
  );
}

export const Header = memo(HeaderComponent);
