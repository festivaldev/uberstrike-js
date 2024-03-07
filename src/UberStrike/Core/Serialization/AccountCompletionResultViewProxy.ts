import { AccountCompletionResultView } from '@/UberStrike/DataCenter/Common/Entities';
import DictionaryProxy from './DictionaryProxy';
import Int32Proxy from './Int32Proxy';
import ListProxy from './ListProxy';
import StringProxy from './StringProxy';

export default class AccountCompletionResultViewProxy {
  public static Serialize(stream: byte[], instance: AccountCompletionResultView): void {
    let num = 0;
    const memoryStream: byte[] = [];

    if (instance.ItemsAttributed) {
      DictionaryProxy.Serialize<int, int>(memoryStream, instance.ItemsAttributed, Int32Proxy.Serialize, Int32Proxy.Serialize);
    } else {
      num |= 1;
    }

    if (instance.NonDuplicateNames) {
      ListProxy.Serialize<string>(memoryStream, instance.NonDuplicateNames, StringProxy.Serialize);
    } else {
      num |= 2;
    }

    Int32Proxy.Serialize(memoryStream, instance.Result);
    Int32Proxy.Serialize(stream, ~num);
    memoryStream.WriteTo(stream);
  }

  public static Deserialize(bytes: byte[]): AccountCompletionResultView {
    const num = Int32Proxy.Deserialize(bytes);
    const accountCompletionResultView = new AccountCompletionResultView();

    if ((num & 1) !== 0) {
      accountCompletionResultView.ItemsAttributed = DictionaryProxy.Deserialize<int, int>(bytes, Int32Proxy.Deserialize, Int32Proxy.Deserialize);
    }

    if ((num & 2) !== 0) {
      accountCompletionResultView.NonDuplicateNames = ListProxy.Deserialize<string>(bytes, StringProxy.Deserialize);
    }

    accountCompletionResultView.Result = Int32Proxy.Deserialize(bytes);

    return accountCompletionResultView;
  }
}
