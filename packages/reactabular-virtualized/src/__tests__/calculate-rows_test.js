import { expect } from 'chai';
import calculateRows from '../calculate-rows';
import calculateAverageHeight from '../calculate-average-height';

jest.mock('../calculate-average-height');

describe('calculateRows', () => {
  it('should return null if no rows are in view', () => {
    calculateAverageHeight.mockReturnValueOnce(10);
    expect(calculateRows({
      height: 500,
      rows: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      scrollTop: -520
    })).to.be.null;
  });
  it('should return the number of rows that fit in the view', () => {
    calculateAverageHeight.mockReturnValueOnce(50);
    expect(calculateRows({
      height: 500,
      rows: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      scrollTop: 0
    })).to.have.property('amountOfRowsToRender', 12);
  });

  it('should not have startIndex lower than zero', () => {
    calculateAverageHeight.mockReturnValueOnce(10);
    expect(calculateRows({
      height: 500,
      rows: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      scrollTop: -100
    })).to.have.property('startIndex', 0);
  });

  it('should only show extra row when on an even index', () => {
    calculateAverageHeight.mockReturnValueOnce(10);
    expect(calculateRows({
      height: 500,
      rows: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      scrollTop: 10
    })).to.have.property('showExtraRow', false);

    calculateAverageHeight.mockReturnValueOnce(10);
    expect(calculateRows({
      height: 500,
      rows: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      scrollTop: 20
    })).to.have.property('showExtraRow', true);
  });
});
