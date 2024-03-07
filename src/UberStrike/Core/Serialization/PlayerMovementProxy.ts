import { PlayerMovement } from '@/UberStrike/Core/Models';
import ByteProxy from './ByteProxy';
import ShortVector3Proxy from './ShortVector3Proxy';

export default class PlayerMovementProxy {
  public static Serialize(stream: byte[], instance: PlayerMovement): void {
    const memoryStream: byte[] = [];
    ByteProxy.Serialize(memoryStream, instance.HorizontalRotation);
    ByteProxy.Serialize(memoryStream, instance.KeyState);
    ByteProxy.Serialize(memoryStream, instance.MovementState);
    ByteProxy.Serialize(memoryStream, instance.Number);
    ShortVector3Proxy.Serialize(memoryStream, instance.Position);
    ShortVector3Proxy.Serialize(memoryStream, instance.Velocity);
    ByteProxy.Serialize(memoryStream, instance.VerticalRotation);
    memoryStream.WriteTo(stream);
  }

  public static Deserialize(bytes: byte[]): PlayerMovement {
    return new PlayerMovement({
      HorizontalRotation: ByteProxy.Deserialize(bytes),
      KeyState: ByteProxy.Deserialize(bytes),
      MovementState: ByteProxy.Deserialize(bytes),
      Number: ByteProxy.Deserialize(bytes),
      Position: ShortVector3Proxy.Deserialize(bytes),
      Velocity: ShortVector3Proxy.Deserialize(bytes),
      VerticalRotation: ByteProxy.Deserialize(bytes),
    });
  }
}
