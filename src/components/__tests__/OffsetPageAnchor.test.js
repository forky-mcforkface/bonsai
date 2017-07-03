/*
 * @flow
 */

import OffsetPageAnchor from '../OffsetPageAnchor';

describe('OffsetPageAnchor', () => {
  it('should return an object with the anchor set', () => {
    expect(OffsetPageAnchor('foobar')).toEqual({
      className: 'OffsetPageSection',
      tabIndex: -1,
      id: 'foobar',
    });
  });

  it('should accept and merge className', () => {
    const props = {
      className: 'pull-right',
    };
    expect(OffsetPageAnchor('foobar', props)).toEqual({
      className: 'OffsetPageSection pull-right',
      tabIndex: -1,
      id: 'foobar',
    });
  });

  it('should accept and include any other props', () => {
    const props = {
      title: 'Click for Foo Bar',
    };
    expect(OffsetPageAnchor('foobar', props)).toEqual({
      title: 'Click for Foo Bar',
      className: 'OffsetPageSection',
      tabIndex: -1,
      id: 'foobar',
    });
  });
});
