import { MigrationInterface, QueryRunner } from 'typeorm';

export class users1795468761251 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                CREATE TABLE IF NOT EXISTS public."user"
                (
                    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
                    createdAt timestamp without time zone NOT NULL DEFAULT now(),
                    updatedAt timestamp without time zone NOT NULL DEFAULT now(),
                    name character varying COLLATE pg_catalog."default" NOT NULL,
                    email character varying COLLATE pg_catalog."default" NOT NULL,
                    provider character varying COLLATE pg_catalog."default" NOT NULL,
                    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),
                ); 
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
