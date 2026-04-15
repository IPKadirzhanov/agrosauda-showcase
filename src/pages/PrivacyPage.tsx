import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <SEOHead title="Политика конфиденциальности — Agrosauda" description="Политика конфиденциальности и обработки персональных данных ТОО AGROSAUDA KAZAKHSTAN" />
      <div className="container-main">
        <Breadcrumbs />
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Политика конфиденциальности</h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p className="text-sm text-muted-foreground/70">Дата вступления в силу: 15 апреля 2026 г.</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Общие положения</h2>
            <p>1.1. Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей платформы agrosauda.kz, принадлежащей ТОО «AGROSAUDA KAZAKHSTAN» (БИН: 251040033871).</p>
            <p>1.2. Используя платформу, Пользователь выражает согласие с настоящей Политикой.</p>
            <p>1.3. Политика разработана в соответствии с Законом Республики Казахстан «О персональных данных и их защите».</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Какие данные мы собираем</h2>
            <p>2.1. При регистрации и использовании платформы мы можем собирать:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>ФИО, электронная почта, номер телефона</li>
              <li>БИН/ИИН (для юридических лиц и ИП)</li>
              <li>Адрес и регион</li>
              <li>Информация о размещённых объявлениях и сделках</li>
              <li>Данные об использовании платформы (cookies, IP-адрес, тип устройства)</li>
              <li>Платёжные данные (обрабатываются через защищённые платёжные системы)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Цели обработки данных</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Регистрация и идентификация Пользователя</li>
              <li>Предоставление доступа к услугам платформы</li>
              <li>Обработка заказов и платежей</li>
              <li>Связь с Пользователем (уведомления, поддержка)</li>
              <li>Улучшение качества сервиса и аналитика</li>
              <li>Выполнение требований законодательства РК</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Защита данных</h2>
            <p>4.1. Мы применяем современные технические и организационные меры для защиты персональных данных, включая шифрование, контроль доступа и безопасное хранение.</p>
            <p>4.2. Доступ к персональным данным имеют только уполномоченные сотрудники Компании.</p>
            <p>4.3. Мы не передаём персональные данные третьим лицам без согласия Пользователя, за исключением случаев, предусмотренных законодательством РК.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Права пользователя</h2>
            <p>Пользователь имеет право:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Получить информацию об обработке своих данных</li>
              <li>Потребовать исправления или удаления своих данных</li>
              <li>Отозвать согласие на обработку данных</li>
              <li>Обратиться в уполномоченный орган по защите персональных данных</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Cookies</h2>
            <p>6.1. Платформа использует файлы cookies для улучшения работы сервиса, аналитики и персонализации.</p>
            <p>6.2. Пользователь может отключить cookies в настройках браузера, однако это может ограничить функциональность платформы.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Контакты</h2>
            <p>По вопросам обработки персональных данных обращайтесь:</p>
            <div className="bg-muted/50 rounded-xl p-6 space-y-2">
              <p><strong>ТОО «AGROSAUDA KAZAKHSTAN»</strong></p>
              <p>Email: info@agrosauda.kz</p>
              <p>Телефон: +7 747 948 13 18</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
