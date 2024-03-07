import { PointDepositView } from '@/Cmune/DataCenter/Common/Entities';

export default class PointDepositsViewModel {
  public PointDeposits: List<PointDepositView>;
  public TotalCount: int;

  constructor(params: any = {}) {
    Object.keys(params).filter((key) => key in this).forEach((key) => { this[key] = params[key]; });
  }
}
