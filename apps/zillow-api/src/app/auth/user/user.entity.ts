import { BeforeInsert, Column, Entity } from 'typeorm'
import { BaseCustom } from '../../../core/database/base-custom'
import * as bcrypt from 'bcrypt'

@Entity('users')
export class UserEntity extends BaseCustom {
  @Column({ type: 'varchar', length: 50 })
  firstName: string

  @Column({ type: 'varchar', length: 150 })
  lastName: string

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255 })
  password: string

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone?: string

  // Temporary field to track if password needs hashing
  private passwordChanged = false

  @BeforeInsert()
  async hashPasswordOnInsert(): Promise<void> {
    if (this.password) {
      this.password = await this.hashPassword(this.password)
    }
  }

  @BeforeInsert()
  async hashPasswordOnUpdate(): Promise<void> {
    // Only hash if password was actually changed
    if (this.passwordChanged && this.password) {
      this.password = await this.hashPassword(this.password)
      this.passwordChanged = false
    }
  }

  // Method to set password (triggers hashing flag)
  setPassword(plainPassword: string): void {
    this.password = plainPassword
    this.passwordChanged = true
  }

  async verifyPassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password)
  }

  async needsPasswordRehash(): Promise<boolean> {
    if (!this.password) return false

    try {
      const currentRounds = this.extractSaltRounds(this.password)
      return currentRounds < 12
    } catch {
      return true
    }
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  private async hashPassword(plainPassword: string): Promise<string> {
    const saltRounds = 12
    return await bcrypt.hash(plainPassword, saltRounds)
  }

  private extractSaltRounds(hashedPassword: string): number {
    const match = hashedPassword.match(/\$2[ayb]\$.{56}/)
    if (!match) throw new Error('Invalid password format')
    return parseInt(match[0].split('$')[2])
  }

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
