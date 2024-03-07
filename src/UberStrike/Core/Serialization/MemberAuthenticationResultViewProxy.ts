import { MemberAuthenticationResult } from '@/Cmune/DataCenter/Common/Entities';
import { MemberAuthenticationResultView } from '@/UberStrike/Core/ViewModel';
import BooleanProxy from './BooleanProxy';
import DateTimeProxy from './DateTimeProxy';
import EnumProxy from './EnumProxy';
import Int32Proxy from './Int32Proxy';
import LuckyDrawUnityViewProxy from './LuckyDrawUnityViewProxy';
import MemberViewProxy from './MemberViewProxy';
import PlayerStatisticsViewProxy from './PlayerStatisticsViewProxy';
import StringProxy from './StringProxy';

export default class MemberAuthenticationResultViewProxy {
  public static Serialize(stream: byte[], instance: MemberAuthenticationResultView): void {
    let num = 0;

    const memoryStream: byte[] = [];
    if (instance.AuthToken) {
      StringProxy.Serialize(memoryStream, instance.AuthToken);
    } else {
      num |= 1;
    }

    BooleanProxy.Serialize(memoryStream, instance.IsAccountComplete);

    if (instance.LuckyDraw) {
      LuckyDrawUnityViewProxy.Serialize(memoryStream, instance.LuckyDraw);
    } else {
      num |= 2;
    }

    EnumProxy.Serialize<MemberAuthenticationResult>(memoryStream, instance.MemberAuthenticationResult);

    if (instance.MemberView) {
      MemberViewProxy.Serialize(memoryStream, instance.MemberView);
    } else {
      num |= 4;
    }

    if (instance.PlayerStatisticsView) {
      PlayerStatisticsViewProxy.Serialize(memoryStream, instance.PlayerStatisticsView);
    } else {
      num |= 8;
    }

    DateTimeProxy.Serialize(memoryStream, instance.ServerTime);
    Int32Proxy.Serialize(stream, ~num);
    memoryStream.WriteTo(stream);
  }

  public static Deserialize(bytes: byte[]): MemberAuthenticationResultView {
    const num = Int32Proxy.Deserialize(bytes);
    const memberAuthenticationResultView = new MemberAuthenticationResultView();

    if ((num & 1) !== 0) {
      memberAuthenticationResultView.AuthToken = StringProxy.Deserialize(bytes);
    }

    memberAuthenticationResultView.IsAccountComplete = BooleanProxy.Deserialize(bytes);

    if ((num & 2) !== 0) {
      memberAuthenticationResultView.LuckyDraw = LuckyDrawUnityViewProxy.Deserialize(bytes);
    }

    memberAuthenticationResultView.MemberAuthenticationResult = EnumProxy.Deserialize<MemberAuthenticationResult>(bytes);

    if ((num & 4) !== 0) {
      memberAuthenticationResultView.MemberView = MemberViewProxy.Deserialize(bytes);
    }

    if ((num & 8) !== 0) {
      memberAuthenticationResultView.PlayerStatisticsView = PlayerStatisticsViewProxy.Deserialize(bytes);
    }

    memberAuthenticationResultView.ServerTime = DateTimeProxy.Deserialize(bytes);

    return memberAuthenticationResultView;
  }
}
