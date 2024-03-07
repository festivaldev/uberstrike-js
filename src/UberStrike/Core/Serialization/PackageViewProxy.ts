import { PackageView } from '@/Cmune/DataCenter/Common/Entities';
import DecimalProxy from './DecimalProxy';
import Int32Proxy from './Int32Proxy';
import ListProxy from './ListProxy';
import StringProxy from './StringProxy';

export default class PackageViewProxy {
  public static Serialize(stream: byte[], instance: PackageView): void {
    let num = 0;

    const memoryStream: byte[] = [];
    Int32Proxy.Serialize(memoryStream, instance.Bonus);

    if (instance.Items) {
      ListProxy.Serialize<int>(memoryStream, instance.Items, Int32Proxy.Serialize);
    } else {
      num |= 1;
    }

    if (instance.Name) {
      StringProxy.Serialize(memoryStream, instance.Name);
    } else {
      num |= 2;
    }

    DecimalProxy.Serialize(memoryStream, instance.Price);
    Int32Proxy.Serialize(stream, ~num);
    memoryStream.WriteTo(stream);
  }

  public static Deserialize(bytes: byte[]): PackageView {
    const num = Int32Proxy.Deserialize(bytes);
    const packageView = new PackageView();
    packageView.Bonus = Int32Proxy.Deserialize(bytes);

    if ((num & 1) !== 0) {
      packageView.Items = ListProxy.Deserialize<int>(bytes, Int32Proxy.Deserialize);
    }

    if ((num & 2) !== 0) {
      packageView.Name = StringProxy.Deserialize(bytes);
    }

    packageView.Price = DecimalProxy.Deserialize(bytes);

    return packageView;
  }
}
