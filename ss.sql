-- Table: public.carrito_compras

-- DROP TABLE IF EXISTS public.carrito_compras;

CREATE TABLE IF NOT EXISTS public.carrito_compras
(
    id_carrito integer NOT NULL DEFAULT nextval('carrito_compras_id_carrito_seq'::regclass),
    id_usuario integer UNIQUE,
    id_producto integer UNIQUE,
    cantidad integer,
    CONSTRAINT carrito_compras_pkey PRIMARY KEY (id_carrito),
    CONSTRAINT carrito_compras_id_producto_fkey FOREIGN KEY (id_producto)
        REFERENCES public.productos (id_producto) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT carrito_compras_id_usuario_fkey FOREIGN KEY (id_usuario)
        REFERENCES public.usuario (id_usuario) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.carrito_compras
    OWNER to postgres;