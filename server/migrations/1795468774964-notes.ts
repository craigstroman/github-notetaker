import { MigrationInterface, QueryRunner } from 'typeorm';

export class notes1795468774964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                CREATE TABLE IF NOT EXISTS public."user"
                (
                    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
                    createdAt timestamp without time zone NOT NULL DEFAULT now(),
                    updatedAt timestamp without time zone NOT NULL DEFAULT now(),
                    notes character varying COLLATE pg_catalog."default" NOT NULL,
                    text character varying COLLATE pg_catalog."default" NOT NULL,
                    "creatorId" integer NOT NULL,
                    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),
                    CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId")
                        REFERENCES public."user" (id) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                ); 
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
