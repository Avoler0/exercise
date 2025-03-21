-- 테이블 생성
/*create table if not exists public.accounts (
                                               id uuid primary key,
                                               nickname text,
                                               birth_date date,
                                               gender text,
                                               grade int default 0,
                                               created_at timestamp default now()
    );

alter table public.accounts disable row level security;*/

-- auth users 와 accounts 테이블 연동
create or replace function public.handle_new_user()
returns trigger as $$
begin
insert into public.accounts (id)
values (new.id);
return new;
end;
$$ language plpgsql security definer;
/*
-- 기존 트리거 제거 (중복 방지)
drop trigger if exists on_auth_user_created on auth.users;*/

-- 트리거 연결: auth.users → public.accounts
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();
