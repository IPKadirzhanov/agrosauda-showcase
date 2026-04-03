CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _account_type text;
BEGIN
  INSERT INTO public.profiles (user_id, display_name, avatar_url, account_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'account_type'
  )
  ON CONFLICT (user_id) DO UPDATE SET
    account_type = COALESCE(EXCLUDED.account_type, profiles.account_type);

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;

  _account_type := NEW.raw_user_meta_data->>'account_type';
  IF _account_type = 'broker' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'broker')
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSIF _account_type = 'business' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'business')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$function$;