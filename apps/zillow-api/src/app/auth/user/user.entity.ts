import { Column, Entity } from 'typeorm'
import { BaseCustom } from '../../../core/database/base-custom'

@Entity('users')
export class UserEntity extends BaseCustom {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  phone: string

  // @OneToMany(() => UserRoleEntity, (userRole) => userRole.userId)
  // userRoles: UserRoleEntity[]
  //
  // // Professional/consumer profiles (each user may have zero or one of each profile)
  // @OneToOne(
  //   () => LandlordProfileEntity,
  //   (landlordProfile) => landlordProfile.user
  // )
  // landlordProfile: LandlordProfileEntity
  //
  // @OneToOne(() => AgentProfileEntity, (agentProfile) => agentProfile.user)
  // agentProfile: AgentProfileEntity
  //
  // @OneToOne(() => BuyerProfileEntity, (buyerProfile) => buyerProfile.user)
  // buyerProfile: BuyerProfileEntity
  //
  // @OneToOne(() => RenterProfileEntity, (renterProfile) => renterProfile.user)
  // renterProfile: RenterProfileEntity
  //
  // @OneToOne(
  //   () => OwnerSellerProfileEntity,
  //   (ownerSellerProfile) => ownerSellerProfile.user
  // )
  // ownerSellerProfile: OwnerSellerProfileEntity
  //
  // @OneToOne(() => BrokerProfileEntity, (brokerProfile) => brokerProfile.user)
  // brokerProfile: BrokerProfileEntity
  //
  // @OneToOne(() => BuilderProfileEntity, (builderProfile) => builderProfile.user)
  // builderProfile: BuilderProfileEntity
  //
  // @OneToOne(() => LenderProfileEntity, (lenderProfile) => lenderProfile.user)
  // lenderProfile: LenderProfileEntity
  //
  // @OneToOne(
  //   () => MediaProProfileEntity,
  //   (mediaProProfile) => mediaProProfile.user
  // )
  // mediaProProfile: MediaProProfileEntity
}
