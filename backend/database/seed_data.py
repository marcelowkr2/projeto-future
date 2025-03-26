import os
import sys
import django

# Configuração do ambiente Django
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from assessments.models import Question

QUESTIONS = [
    # ========== Governança (GV) ==========
    # Organizacional Context (OC)
    {"category": "GV.OC", "text": "A missão organizacional é compreendida e orienta a gestão de riscos cibernéticos?"},
    {"category": "GV.OC", "text": "Os stakeholders internos e externos são compreendidos, e suas necessidades e expectativas em relação à gestão de riscos cibernéticos são entendidas e consideradas?"},
    {"category": "GV.OC", "text": "Os requisitos legais, regulatórios e contratuais relacionados à cibersegurança — incluindo obrigações de privacidade e liberdades civis — são compreendidos e geridos?"},
    {"category": "GV.OC", "text": "Os objetivos críticos, capacidades e serviços dos quais os stakeholders dependem ou esperam da organização são compreendidos e comunicados?"},
    {"category": "GV.OC", "text": "Os resultados, capacidades e serviços dos quais a organização depende são compreendidos e comunicados?"},
    
    # Risk Management (RM)
    {"category": "GV.RM", "text": "Os objetivos de gestão de risco são estabelecidos e acordados pelos stakeholders da organização?"},
    {"category": "GV.RM", "text": "Declarações de apetite ao risco e tolerância ao risco são estabelecidas, comunicadas e mantidas?"},
    {"category": "GV.RM", "text": "As atividades e resultados da gestão de riscos cibernéticos são incluídos nos processos de gestão de riscos empresariais?"},
    {"category": "GV.RM", "text": "Uma direção estratégica que descreve opções apropriadas de resposta ao risco é estabelecida e comunicada?"},
    {"category": "GV.RM", "text": "São estabelecidas linhas de comunicação para riscos cibernéticos em toda a organização, incluindo riscos de fornecedores e outras terceiras partes?"},
    {"category": "GV.RM", "text": "Um método padronizado para calcular, documentar, categorizar e priorizar riscos cibernéticos é estabelecido e comunicado?"},
    {"category": "GV.RM", "text": "Oportunidades estratégicas (ou seja, riscos positivos) são caracterizadas e incluídas nas discussões sobre risco cibernético da organização?"},
    
    # Roles and Responsibilities (RR)
    {"category": "GV.RR", "text": "A liderança organizacional é responsável e responsabilizada pelo risco cibernético e promove uma cultura que é consciente dos riscos, da ética e está em constante melhoria?"},
    {"category": "GV.RR", "text": "Papéis, responsabilidades e autoridades relacionadas à gestão de risco cibernético são estabelecidos, comunicados, compreendidos e aplicados?"},
    {"category": "GV.RR", "text": "Recursos adequados são alocados de forma proporcional à estratégia de risco cibernético, papéis, responsabilidades e políticas?"},
    {"category": "GV.RR", "text": "A cibersegurança é incluída nas práticas de recursos humanos?"},
    
    # Policy and Oversight (PO)
    {"category": "GV.PO", "text": "Política para a gestão de riscos cibernéticos é estabelecida com base no contexto organizacional, estratégia de cibersegurança e prioridades e é comunicada e aplicada?"},
    {"category": "GV.PO", "text": "Política para a gestão de riscos cibernéticos é revisada, atualizada, comunicada e aplicada para refletir mudanças nos requisitos, ameaças, tecnologia e missão organizacional?"},
    
    # Oversight (OV)
    {"category": "GV.OV", "text": "Os resultados da estratégia de gestão de riscos cibernéticos são revisados para informar e ajustar a estratégia e a direção?"},
    {"category": "GV.OV", "text": "A estratégia de gestão de riscos cibernéticos é revisada e ajustada para garantir a cobertura dos requisitos e riscos organizacionais?"},
    {"category": "GV.OV", "text": "O desempenho da gestão de riscos cibernéticos organizacional é avaliado e revisado para ajustes necessários?"},
    
    # Supply Chain (SC)
    {"category": "GV.SC", "text": "Um programa de gestão de riscos da cadeia de suprimentos de cibersegurança, estratégia, objetivos, políticas e processos são estabelecidos e acordados pelos stakeholders organizacionais?"},
    {"category": "GV.SC", "text": "Papéis e responsabilidades de cibersegurança para fornecedores, clientes e parceiros são estabelecidos, comunicados e coordenados interna e externamente?"},
    {"category": "GV.SC", "text": "A gestão de riscos da cadeia de suprimentos de cibersegurança é integrada à gestão de riscos de cibersegurança e empresarial, avaliação de riscos e processos de melhoria?"},
    {"category": "GV.SC", "text": "Fornecedores são conhecidos e priorizados pela criticidade?"},
    {"category": "GV.SC", "text": "Requisitos para abordar riscos de cibersegurança em cadeias de suprimentos são estabelecidos, priorizados e integrados em contratos e outros tipos de acordos com fornecedores e outras terceiras partes relevantes?"},
    {"category": "GV.SC", "text": "Planejamento e diligências prévias são realizados para reduzir riscos antes de entrar em relações formais com fornecedores ou outras terceiras partes?"},
    {"category": "GV.SC", "text": "Os riscos apresentados por um fornecedor, seus produtos e serviços e outras terceiras partes são compreendidos, registrados, priorizados, avaliados, respondidos e monitorados ao longo do relacionamento?"},
    {"category": "GV.SC", "text": "Fornecedores relevantes e outras terceiras partes são incluídos no planejamento, resposta e recuperação de incidentes?"},
    {"category": "GV.SC", "text": "Práticas de segurança da cadeia de suprimentos são integradas aos programas de gestão de riscos de cibersegurança e empresarial, e seu desempenho é monitorado ao longo do ciclo de vida de produtos e serviços tecnológicos?"},
    {"category": "GV.SC", "text": "Planos de gestão de riscos da cadeia de suprimentos de cibersegurança incluem disposições para atividades que ocorrem após a conclusão de uma parceria ou acordo de serviço?"},

    # ========== Identificar (ID) ==========
    # Asset Management (AM)
    {"category": "ID.AM", "text": "Inventários de hardware gerenciados pela organização são mantidos?"},
    {"category": "ID.AM", "text": "Inventários de software, serviços e sistemas gerenciados pela organização são mantidos?"},
    {"category": "ID.AM", "text": "Representações das comunicações de rede autorizadas da organização e dos fluxos de dados de rede internos e externos são mantidas?"},
    {"category": "ID.AM", "text": "Inventários de serviços fornecidos por fornecedores são mantidos?"},
    {"category": "ID.AM", "text": "Ativos são priorizados com base na classificação, criticidade, recursos e impacto na missão?"},
    {"category": "ID.AM", "text": "Inventários de dados e metadados correspondentes para tipos de dados designados são mantidos?"},
    {"category": "ID.AM", "text": "Sistemas, hardware, software, serviços e dados são gerenciados ao longo de seus ciclos de vida?"},
    
    # Risk Assessment (RA)
    {"category": "ID.RA", "text": "Vulnerabilidades nos ativos são identificadas, validadas e registradas?"},
    {"category": "ID.RA", "text": "Inteligência sobre ameaças cibernéticas é recebida de fóruns e fontes de compartilhamento de informações?"},
    {"category": "ID.RA", "text": "Ameaças internas e externas à organização são identificadas e registradas?"},
    {"category": "ID.RA", "text": "Os impactos potenciais e as probabilidades de ameaças explorarem vulnerabilidades são identificados e registrados?"},
    {"category": "ID.RA", "text": "Ameaças, vulnerabilidades, probabilidades e impactos são usados para entender o risco inerente e informar a priorização da resposta ao risco?"},
    {"category": "ID.RA", "text": "Respostas ao risco são escolhidas, priorizadas, planejadas, rastreadas e comunicadas?"},
    {"category": "ID.RA", "text": "Mudanças e exceções são gerenciadas, avaliadas quanto ao impacto no risco, registradas e rastreadas?"},
    {"category": "ID.RA", "text": "Processos para receber, analisar e responder a divulgações de vulnerabilidades são estabelecidos?"},
    {"category": "ID.RA", "text": "A autenticidade e integridade do hardware e software são avaliadas antes da aquisição e uso?"},
    {"category": "ID.RA", "text": "Fornecedores críticos são avaliados antes da aquisição?"},
    
    # Improvement (IM)
    {"category": "ID.IM", "text": "Melhorias são identificadas a partir de avaliações?"},
    {"category": "ID.IM", "text": "Melhorias são identificadas a partir de testes de segurança e exercícios, incluindo aqueles realizados em coordenação com fornecedores e terceiros relevantes?"},
    {"category": "ID.IM", "text": "Melhorias são identificadas a partir da execução de processos operacionais, procedimentos e atividades?"},
    {"category": "ID.IM", "text": "Planos de resposta a incidentes e outros planos de cibersegurança que afetam as operações são estabelecidos, comunicados, mantidos e melhorados?"},

    # ========== Proteger (PR) ==========
    # Access Control (AA)
    {"category": "PR.AA", "text": "Identidades e credenciais de usuários, serviços e hardware autorizados são gerenciados pela organização?"},
    {"category": "PR.AA", "text": "Identidades são comprovadas e vinculadas a credenciais com base no contexto das interações?"},
    {"category": "PR.AA", "text": "Usuários, serviços e hardware são autenticados?"},
    {"category": "PR.AA", "text": "Asserções de identidade são protegidas, transmitidas e verificadas?"},
    {"category": "PR.AA", "text": "Permissões de acesso, direitos e autorizações são definidos em uma política, gerenciados, aplicados e revisados, e incorporam os princípios de menor privilégio e separação de funções?"},
    {"category": "PR.AA", "text": "O acesso físico aos ativos é gerenciado, monitorado e aplicado proporcionalmente ao risco?"},
    
    # Awareness and Training (AT)
    {"category": "PR.AT", "text": "O pessoal recebe conscientização e treinamento para que possuam o conhecimento e habilidades necessárias para executar tarefas gerais com a consciência dos riscos de cibersegurança?"},
    {"category": "PR.AT", "text": "Indivíduos em funções especializadas recebem conscientização e treinamento para que possuam o conhecimento e habilidades necessárias para executar tarefas relevantes com a consciência dos riscos de cibersegurança?"},
    
    # Data Security (DS)
    {"category": "PR.DS", "text": "A confidencialidade, integridade e disponibilidade dos dados em repouso são protegidas?"},
    {"category": "PR.DS", "text": "A confidencialidade, integridade e disponibilidade dos dados em trânsito são protegidas?"},
    {"category": "PR.DS", "text": "A confidencialidade, integridade e disponibilidade dos dados em uso são protegidas?"},
    {"category": "PR.DS", "text": "Cópias de segurança dos dados são criadas, protegidas, mantidas e testadas?"},
    
    # Platform Security (PS)
    {"category": "PR.PS", "text": "Práticas de gestão de configuração são estabelecidas e aplicadas?"},
    {"category": "PR.PS", "text": "O software é mantido, substituído e removido proporcionalmente ao risco?"},
    {"category": "PR.PS", "text": "O hardware é mantido, substituído e removido proporcionalmente ao risco?"},
    {"category": "PR.PS", "text": "Registros de log são gerados e disponibilizados para monitoramento contínuo?"},
    {"category": "PR.PS", "text": "A instalação e execução de software não autorizado são prevenidas?"},
    {"category": "PR.PS", "text": "Práticas seguras de desenvolvimento de software são integradas e seu desempenho é monitorado ao longo do ciclo de vida de desenvolvimento de software?"},
    
    # Infrastructure Resilience (IR)
    {"category": "PR.IR", "text": "Redes e ambientes são protegidos contra acesso e uso lógico não autorizado?"},
    {"category": "PR.IR", "text": "Os ativos tecnológicos da organização são protegidos contra ameaças ambientais?"},
    {"category": "PR.IR", "text": "Mecanismos são implementados para alcançar requisitos de resiliência em situações normais e adversas?"},
    {"category": "PR.IR", "text": "Capacidade de recurso adequada para garantir a disponibilidade é mantida?"},

    # ========== Detectar (DE) ==========
    # Continuous Monitoring (CM)
    {"category": "DE.CM", "text": "Redes e serviços de rede são monitorados para identificar eventos potencialmente adversos?"},
    {"category": "DE.CM", "text": "O ambiente físico é monitorado para identificar eventos potencialmente adversos?"},
    {"category": "DE.CM", "text": "Atividades de pessoal e uso de tecnologia são monitorados para identificar eventos potencialmente adversos?"},
    {"category": "DE.CM", "text": "Atividades e serviços de provedores de serviço externos são monitorados para identificar eventos potencialmente adversos?"},
    {"category": "DE.CM", "text": "Hardware e software de computação, ambientes de execução e seus dados são monitorados para identificar eventos potencialmente adversos?"},
    
    # Anomalies and Events (AE)
    {"category": "DE.AE", "text": "Eventos potencialmente adversos são analisados para melhor entender as atividades associadas?"},
    {"category": "DE.AE", "text": "Informações são correlacionadas de múltiplas fontes?"},
    {"category": "DE.AE", "text": "O impacto estimado e o alcance dos eventos adversos são compreendidos?"},
    {"category": "DE.AE", "text": "Informações sobre eventos adversos são fornecidas a pessoal autorizado e ferramentas?"},
    {"category": "DE.AE", "text": "Inteligência de ameaças cibernéticas e outras informações contextuais são integradas à análise?"},
    {"category": "DE.AE", "text": "Incidentes são declarados quando eventos adversos atendem aos critérios de incidente definidos?"},

    # ========== Responder (RS) ==========
    # Incident Management (MA)
    {"category": "RS.MA", "text": "O plano de resposta a incidentes é executado em coordenação com terceiros relevantes uma vez que um incidente é declarado?"},
    {"category": "RS.MA", "text": "Relatórios de incidentes são triados e validados?"},
    {"category": "RS.MA", "text": "Incidentes são categorizados e priorizados?"},
    {"category": "RS.MA", "text": "Incidentes são escalados ou elevados conforme necessário?"},
    {"category": "RS.MA", "text": "Os critérios para iniciar a recuperação de incidentes são aplicados?"},
    
    # Analysis (AN)
    {"category": "RS.AN", "text": "Análises são realizadas para estabelecer o que ocorreu durante um incidente e a causa raiz do incidente?"},
    {"category": "RS.AN", "text": "Ações realizadas durante uma investigação são registradas, e a integridade e a proveniência dos registros são preservadas?"},
    {"category": "RS.AN", "text": "Dados e metadados do incidente são coletados, e sua integridade e proveniência são preservadas?"},
    {"category": "RS.AN", "text": "A magnitude de um incidente é estimada e validada?"},
    
    # Communications (CO)
    {"category": "RS.CO", "text": "Partes interessadas internas e externas são notificadas dos incidentes?"},
    {"category": "RS.CO", "text": "Informações são compartilhadas com partes interessadas internas e externas designadas?"},
    
    # Mitigation (MI)
    {"category": "RS.MI", "text": "Incidentes são contidos?"},
    {"category": "RS.MI", "text": "Incidentes são erradicados?"},

    # ========== Recuperar (RC) ==========
    # Recovery Planning (RP)
    {"category": "RC.RP", "text": "A parte de recuperação do plano de resposta a incidentes é executada uma vez iniciada a partir do processo de resposta a incidentes?"},
    {"category": "RC.RP", "text": "Ações de recuperação são selecionadas, dimensionadas, priorizadas e realizadas?"},
    {"category": "RC.RP", "text": "A integridade dos backups e outros ativos de restauração é verificada antes de usá-los para restauração?"},
    {"category": "RC.RP", "text": "Funções críticas de missão e gestão de riscos de cibersegurança são consideradas para estabelecer normas operacionais pós-incidente?"},
    {"category": "RC.RP", "text": "A integridade dos ativos restaurados é verificada, sistemas e serviços são restaurados, e o status operacional normal é confirmado?"},
    {"category": "RC.RP", "text": "O fim da recuperação de incidentes é declarado com base em critérios, e a documentação relacionada ao incidente é completada?"},
    
    # Communications (CO)
    {"category": "RC.CO", "text": "Atividades de recuperação e progresso na restauração das capacidades operacionais são comunicados a partes interessadas internas e externas designadas?"},
    {"category": "RC.CO", "text": "Atualizações públicas sobre a recuperação de incidentes são compartilhadas usando métodos e mensagens aprovados?"},
]

def seed_questions():
    for data in QUESTIONS:
        Question.objects.get_or_create(
            category=data["category"],
            text=data["text"]
        )
    print(f"✅ {len(QUESTIONS)} questões adicionadas ao banco de dados!")

if __name__ == "__main__":
    seed_questions()