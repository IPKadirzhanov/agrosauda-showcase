import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username, password } = await req.json();

    if (username !== 'Admin' || password !== 'admin') {
      return new Response(JSON.stringify({ error: 'Неверные учётные данные' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const adminEmail = 'admin@agrosauda.kz';

    // Check if admin user exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    let adminUser = existingUsers?.users?.find(u => u.email === adminEmail);

    if (!adminUser) {
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: 'admin',
        email_confirm: true,
        user_metadata: { display_name: 'Admin' }
      });
      if (createError) {
        return new Response(JSON.stringify({ error: createError.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      adminUser = newUser.user;

      // Assign admin role
      await supabase.from('user_roles').insert({
        user_id: adminUser.id,
        role: 'admin'
      });
    } else {
      // Ensure admin role exists
      const { data: roleExists } = await supabase.from('user_roles')
        .select('id')
        .eq('user_id', adminUser.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roleExists) {
        await supabase.from('user_roles').insert({
          user_id: adminUser.id,
          role: 'admin'
        });
      }
    }

    // Sign in
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const anonClient = createClient(supabaseUrl, anonKey);

    const { data: signInData, error: signInError } = await anonClient.auth.signInWithPassword({
      email: adminEmail,
      password: 'admin'
    });

    if (signInError) {
      return new Response(JSON.stringify({ error: signInError.message }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      session: signInData.session,
      user: signInData.user
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
