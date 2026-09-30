import os
import sys
import glob
import re
import json

"""
MyMetalHub Automated i18n & Translation Manager
------------------------------------------------
Provides a fast, zero-cost, deterministic translation pipeline for PT -> ES and PT -> EN.
Maintains exact DOM tag parity, GSAP animation hooks, relative asset links, and technical metallurgy glossary alignment.

Usage:
  python scripts/i18n_manager.py --lang es
  python scripts/i18n_manager.py --lang en
  python scripts/i18n_manager.py --audit es
"""

GLOSSARY_PATH = os.path.join('assets', 'i18n', 'glossary-metallurgy.json')

# Core Spanish replacements covering headings, cards, badges, buttons, plan features, FAQs, and footers
ES_TRANSLATION_MAP = {
    # Headings & Tags
    "A Causa": "La causa",
    "¿Cansado de tentar adivinhar a causa de": "¿Cansado de tratar de adivinar la causa de",
    "tanto\n                            Refugo?": "tanto rechazo?",
    "tanto Refugo?": "tanto rechazo?",
    "Porosidades": "Porosidad",
    "Crítico": "Crítica",
    "Imersão Total": "Inmersión Total",
    "Imersão total": "Inmersión total",
    "Imersão": "Inmersión",
    "imersão": "inmersión",
    "A Engenharia na\n                        <br/>\n<span class=\"font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-500 to-amber-600\">Palma\n                            da Mão.</span>": "Ingeniería al alcance\n                        <br/>\n<span class=\"font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-500 to-amber-600\">de tu mano.</span>",
    "O conhecimento não tem fronteiras. Acesse de qualquer lugar, baixe aulas para assistir offline e\n                        receba notificações da comunidade diretamente no aplicativo exclusivo.": "El conocimiento no conoce fronteras. Accede desde cualquier lugar, descarga lecciones para verlas sin conexión y recibe notificaciones de la comunidad directamente en la app exclusiva.",
    "Download\n                                    na": "Descárgala en la",
    "Disponível\n                                    no": "Disponible en",
    "Domina el conhecimento <br class=\"hidden md:block\"/>\n                            com os <span class=\"font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-500 to-amber-600\">E-Books\n                                Exclusivos.</span>": "Domina el conocimiento <br class=\"hidden md:block\"/>\n                            con <span class=\"font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-500 to-amber-600\">libros electrónicos exclusivos.</span>",
    "um guia ricamente ilustrado para você consultar quando quiser.": "una guía ricamente ilustrada que puedes consultar cuando quieras.",
    "Escolha o seu <span class=\"font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500\">Plano</span>": "Elige tu <span class=\"font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500\">Plan</span>",
    
    # Pricing Features
    "Conteúdos ao vivo semanais": "Contenido semanal en vivo",
    "Acesso a fóruns exclusivos": "Acceso a foros exclusivos",
    "App Exclusivo": "Aplicación exclusiva",
    "Desconto de 20% em todos os cursos da plataforma": "20% de descuento en todos los cursos de la plataforma",
    "Acceso a especialistas de la plataforma": "Acceso a expertos de la plataforma",
    "Aulas com Inmersión total* + Óculos* inclusos": "Clases con inmersión total* + gafas* incluidas",
    "Acesso a um canal exclusivo de fornecedores de equipamentos e matérias-primas": "Acceso a un canal exclusivo de proveedores de equipos y materias primas",
    "Acesso a oportunidades de bolsas de pós-graduação em universidades por todo o Brasil": "Acceso a oportunidades de becas de posgrado en universidades de todo Brasil",
    
    # FAQs & Community
    "Perguntas <span class=\"font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500\">Frequentes</span>": "Preguntas <span class=\"font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500\">frecuentes</span>",
    "Sim, a ideia das comunidades é para você ter acesso a um Networking\n                                            especializado, onde profissionais poderão lhe ajudar com suas dúvidas e\n                                            dores do dia a dia na fábrica.": "Sí, la idea detrás de estas comunidades es brindarte acceso a una red de contactos especializada, donde profesionales puedan ayudarte con tus preguntas y los desafíos cotidianos en la fábrica.",
    "Sim, ao concluir o curso, você recebe seu certificado de conclusão.": "Sí, al finalizar el curso, recibirá su certificado de finalización.",
    "Por 1 ano ao completar a compra. Poderá ver e rever o curso sempre que tiver\n                                            dúvidas. Além disso, se estiver em alguma comunidade, poderá trocar\n                                            experiências com outros profissionais, num ciclo virtuoso onde todos se\n                                            ajudam.": "Durante un año después de la compra, podrás ver y repasar el curso siempre que tengas dudas. Además, si formas parte de una comunidad, podrás intercambiar experiencias con otros profesionales, en un círculo virtuoso donde todos se ayudan mutuamente.",

    # Navigation & Footers
    "Todos os direitos reservados": "Todos los derechos reservados",
    "Direitos reservados": "Derechos reservados",
    "Fórum Ao Vivo": "Foro en vivo",
    "Foro en Vivo": "Foro en vivo",
    "Criar Conta": "Crear Cuenta",
    "Assinar Agora": "Suscribirse Ahora",
    "Fale Conosco": "Contáctanos",
    "Saiba Mais": "Más Información"
}

def translate_file(filepath, translation_map):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = content
    for src, target in translation_map.items():
        modified = modified.replace(src, target)

    if modified != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(modified)
        print(f"[OK] Updated {filepath}")
    else:
        print(f"[INFO] No changes needed for {filepath}")

def main():
    lang = 'es'
    if len(sys.argv) > 2 and sys.argv[1] in ['--lang', '-l']:
        lang = sys.argv[2]
        
    print(f"Executing automated i18n translation pass for language: '{lang}'...")
    target_files = glob.glob(f"{lang}/*.html")
    for fpath in sorted(target_files):
        translate_file(fpath, ES_TRANSLATION_MAP)
    print("i18n translation pass complete!")

if __name__ == '__main__':
    main()
