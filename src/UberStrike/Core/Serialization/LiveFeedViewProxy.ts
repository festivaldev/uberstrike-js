import { LiveFeedView } from '@/UberStrike/DataCenter/Common/Entities';
import DateTimeProxy from './DateTimeProxy';
import Int32Proxy from './Int32Proxy';
import StringProxy from './StringProxy';

export default class LiveFeedViewProxy {
  public static Serialize(stream: byte[], instance: LiveFeedView): void {
    let num = 0;

    const memoryStream: byte[] = [];
    DateTimeProxy.Serialize(memoryStream, instance.Date);

    if (instance.Description) {
      StringProxy.Serialize(memoryStream, instance.Description);
    } else {
      num |= 1;
    }

    Int32Proxy.Serialize(memoryStream, instance.LivedFeedId);
    Int32Proxy.Serialize(memoryStream, instance.Priority);

    if (instance.Url) {
      StringProxy.Serialize(memoryStream, instance.Url);
    } else {
      num |= 2;
    }

    Int32Proxy.Serialize(stream, ~num);
    memoryStream.WriteTo(stream);
  }

  public static Deserialize(bytes: byte[]): LiveFeedView {
    const num = Int32Proxy.Deserialize(bytes);
    const liveFeedView = new LiveFeedView();
    liveFeedView.Date = DateTimeProxy.Deserialize(bytes);

    if ((num & 1) !== 0) {
      liveFeedView.Description = StringProxy.Deserialize(bytes);
    }

    liveFeedView.LivedFeedId = Int32Proxy.Deserialize(bytes);
    liveFeedView.Priority = Int32Proxy.Deserialize(bytes);

    if ((num & 2) !== 0) {
      liveFeedView.Url = StringProxy.Deserialize(bytes);
    }

    return liveFeedView;
  }
}
